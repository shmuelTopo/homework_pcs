//Server stuff
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const myLogger = require('./logger');
require("dotenv").config();

//Setup Sessions with MySql
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const pool = require('./sqlPool');
const setUpDb = require('./setupDb');
setUpDb(pool);

const sessionStore = new MySQLStore({} , pool);

//Comiunicate with Db
const usersDb = require('./usersDb');
const messageDb = require('./messagesDb');
const groupDb = require('./groupsDb');

//Setup File server, Cookie 
const path = require('path');
const cookieParser = require('cookie-parser');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Enable cors
const cors = require('cors');
app.use(cors({
  origin : [ 'http://localhost:4000' ],
  methods:["GET" , "POST" , "PUT", "DELETE"],
  credentials: true
}));

//Setup and use SocketIo
const { Socket } = require('socket.io');
const sessionMiddleware = session({
  secret: "changeit",
  resave: true,
  store: sessionStore,
  saveUninitialized: false
});
app.use(sessionMiddleware);

//Enable cors in SocketIo
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

//Setup Login / Signup using Post
app.post("/login", async (req, res) => {
  try {
    const { username, password, method } = req.body;
    
    const user = await usersDb.login(username, password, method);
    req.session.authenticated = true;
    req.session.user = {
      username: user.username,
      id: user.id
    }
    if(method === 'signup') {
      req.session.signup = true;
    }
    req.session.save();

    res.cookie('username', user.username);
    res.cookie('userId', user.id);
    res.status(200).json({
      username: user.username,
      id: user.id
    });
  } catch(err) {
    console.error('login error', err.message);
    req.session.authenticated = false;
    req.session.user = null;
    res.clearCookie('username');
    res.clearCookie('userId');
    return res.status(err.statusCode || 500).end(err.message || 'Something went wrong');
  }
});

//Wrap the Authontication middleware and use it in SocketIo
const wrap = (middleware) => {
  return (socket, next) => {
    return middleware(socket.request, {}, next)
  };
}

socketIo.use(wrap(sessionMiddleware));
socketIo.use(async (socket, next) => {
  const session = socket.request.session;
  if (session && session.authenticated) {
    const isAuthorised = await usersDb.isUser(session.user.username);
    if(!isAuthorised) {
      socket.emit('logout', {});
    }
    myLogger('user', `user ${session.user.username} is authorised`)
    next();
  } else {
    myLogger('user', `user is not authorised`);
    socket.emit('logout', {});
    return next(new Error("unauthorized"));
  }
});

let activeUsers = [];

socketIo.on('connection',async (socket) => {
  const session = socket.request.session;

  const user = {};
  
  user.socket = socket;
  user.id = session.user.id;
  user.username = session.user.username;
  user.groupsId = await groupDb.getGroupsIdforUser(user.id);

  console.log('connecting user', user.username);


  socket.emit('login', {username: user.username, id:user.id})
  socket.emit('online', {username: user.username, id:user.id})

  activeUsers.push(user);
  activeUsers.forEach(u => {
    u.socket.emit('lastseen', {userid: user.id, datetime: 'online'});
  })

  try {
    await usersDb.setOnline(user.id);
  } catch(error) {
    return console.error(`error setting user ${user.id} to online status`)
  }

  if(session.signup) {
    socket.broadcast.emit('addUsers', [{ username: user.username, id: user.id }]);
    await groupDb.addUserToGroup(user.id, 1);
    user.groupsId.push(1);
  }

  try {
    const users = await usersDb.getUsers();
    socket.emit('addUsers', users);

    const c = await usersDb.getConversations(user.id);
    const conversations = await Promise.all(c.map(async conv => {
      if(conv.groupId){
        const c = {
          conversationId: conv.id,
          groupId: conv.groupId,
          groupName: conv.groupName,
          type: 'group',
          lastMessageDatetime: conv.lastMessageDatetime
        };
        c.messages = await groupDb.getGroupMessages(conv.groupId);
        c.groupUsers = await groupDb.getUsersForGroup(conv.groupId);
        return c;
      } else {
        const c = {
          conversationId: conv.id,
          otherUserId: conv.userIdA === user.id ? conv.userIdB : conv.userIdA,
          otherUserName: conv.usernameA === user.username ? conv.usernameB : conv.usernameA,
          type: 'pm',
          lastMessageDatetime: conv.lastMessageDatetime
        };
        c.messages = await messageDb.getPmMessages(user.id, c.otherUserId);
        return c;
      }
    }));
    console.log('emiting conversations', conversations.length);
    socket.emit('conversations', conversations);

    if(session.signup) {
      const newUserMessage = `User ${user.username} had join the group`;
      const message = await groupDb.newGroupMessage(user.id, 1, newUserMessage, 'login');
      message.username = user.username;
  
      activeUsers.forEach((u) => {
        if(u.groupsId.includes(message.groupId)){
          u.socket.emit('message', message)
        }
      })
      session.signup = false;
      session.save();
    }
  } catch(error) {
    console.error('getting users', error);
  }

  activeUsers.forEach(u => {
    u.socket.emit('online', user.id);
  })

  socket.on('message', async (message, callback) => {

    try {
      const isUser = await usersDb.isUser(user.username);
      if(!isUser) {
        throw new Error('You are not a real user');
      }

      let newMessage;
      message.username = user.username;

      if(message.conversationType === 'pm') {
        newMessage = await messageDb.newPrivateMessage(user.id, message.otherUserId, message.text, message.type);
        activeUsers.forEach((u) => {
          if(u.id === user.id || u.id === message.otherUserId){
            newMessage.conversationId = message.conversationId;
            u.socket.emit('message', newMessage)
          }
        })
      } else if(message.conversationType === 'group') {
        newMessage = await groupDb.newGroupMessage(user.id, message.groupId, message.text, message.type);
        activeUsers.forEach((u) => {
          if(u.groupsId.includes(message.groupId)){
            newMessage.conversationId = message.conversationId;
            (newMessage);
            u.socket.emit('message', newMessage)
          }
        })
      }
      
    } catch(error) {
      console.error('new message', error);
      return callback(error.message);
    }
    
  })

  socket.on('newPmConversation', async (message, callback) => {
    console.log(message);
    try {
      const isUser = await usersDb.isUser(user.username);
      if(!isUser) {
        throw new Error('You are not a real user');
      }
      const newConversation = await usersDb.newPmConversation(user.id, message);
      console.log(newConversation);

      const otherUser = activeUsers.find(u => {
        return u.id === message.otherUserId
      })

      if(otherUser) {
        otherUser.socket.emit('newConversation', [ newConversation ]);
      }
      return callback(undefined, newConversation);
      
    } catch(error) {
      console.error('new message', error);
      return callback(error.message);
    }
    
  })

  socket.on('typing', conv => {
    console.log(conv);
    
    //If last typing emit was to the same id and it was less than 4 sec ago, return
    if(user.lastTypingEmit) {
      if(user.lastTyping.conversationId === conv.conversationId){
        const now = new Date();
        const diffSec = (now.getTime() - user.lastTypingEmit.getTime()) / 1000;
        //Client should only send typing emit not less than 3 seconds anyway
        if(diffSec < 3) {
          return;
        }
      }
    }

    if(conv.type === 'group') {
      conv.userId = user.id;
      activeUsers.forEach((u) => {
        if(u.groupsId.includes(conv.groupId)){
          u.socket.emit('typing', conv)
        }
      })
    } else if(conv.type === 'pm') {
      const otherUser = activeUsers.find(u => u.id === conv.otherUserId);
      if(otherUser){
        conv.otherUserId = user.id;
        otherUser.socket.emit('typing', conv);
      }
    }
  })

  socket.on('logout', () => {
    activeUsers = activeUsers.filter(u => u.username !== user.username);
    session.destroy();
    socket.disconnect();
  }) 

  socket.on('disconnect', async () => {
    activeUsers = activeUsers.filter(u => u.username !== user.username);

    try {
      const datetime = await usersDb.updateLastSeen(user.id);
      console.log(user.id, 'leave on', datetime);
      activeUsers.forEach(u => {
        u.socket.emit('lastseen', {userid: user.id, datetime: datetime});
      })
    } catch(error) {
      return console.error('coudn\'t update last seen for contact', user.id);
    }


  });

});

app.use((err,req,res,next)=> {
  console.error('general error', err);
  err.statusCode= err.statusCode || 500
  err.status= err.status || 'error'
  res.status(err.statusCode).send('Something went wrong')
})

app.use('/', (req, res, next) => {
  res.end('Hello world');
});

server.listen(80);