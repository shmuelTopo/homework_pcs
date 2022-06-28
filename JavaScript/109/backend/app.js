//Server stuff
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const myLogger = require('./logger');

//Setup Sessions with MySql
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const pool = require('./sqlPool');
const sessionStore = new MySQLStore({}, pool);

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
    console.error(err.message);
    req.session.authenticated = false;
    req.session.user = null;
    res.clearCookie('username');
    res.clearCookie('userId');
    return res.status(err.statusCode || 500).end('Something went wrong');
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

    socket.emit('conversetions', conversations);

  } catch(error) {
    console.error(error);
  }

  activeUsers.forEach(u => {
    u.socket.emit('online', user.id);
  })

  if(session.signup) {

    const newUserMessage = `User ${user.username} had join the chat`;
    
    socket.broadcast.emit('addUsers', [{ username: user.username, id: user.id }]);
    session.signup = false;
    session.save();

    try {
      const message = await messageDb.newMessage(user.id, newUserMessage, 'login');
      message.username = user.username;
      socketIo.emit('messages', [message]);
    }catch(error) {
      console.error(error.message);
    }
  }

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
      console.error(error);
      return callback(error.message);
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
      return console.err('coudn\'t update last seen for contact', user.id);
    }


  });

});

app.use('/', (req, res, next) => {
  res.end('Hello world');
});

server.listen(80);