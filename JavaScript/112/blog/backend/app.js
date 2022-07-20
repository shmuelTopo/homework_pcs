//Server stuff
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
require("dotenv").config();
const mongoFunctions = require('./mongoFunctions');

//import router
const postRoute = require('./routes/posts');
const loginRoute = require('./routes/login');

//Setup Sessions with MySql
const session = require('express-session');
const MongoStore = require('connect-mongo');

const mongoOptions = {
  mongoUrl: 'mongodb://localhost:27017'
}

const sessionMiddleware = session({
  secret: "changeit",
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create(mongoOptions),
});

app.use(sessionMiddleware);

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
  origin : process.env.APP_URL.split(','),
  methods:["GET" , "POST" , "PUT", "DELETE"],
  credentials: true
}));

//Setup Socket.io and enable cors in socket.io
const io = require('socket.io');
global.socketIo = io(server, {
  cors: {
    origin : process.env.APP_URL.split(','),
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use('/posts', postRoute);
app.use('/login', loginRoute);
app.use('/logout', async (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.clearCookie('user');
  return res.status(202).end();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const e = new Error('Not Found');
  e.status = 404;
  next(e);
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.send(err.message);
});

server.listen(8000);

module.exports = app;
