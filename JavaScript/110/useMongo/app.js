var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// const { MongoClient } = require("mongodb");
// // Replace the uri string with your connection string.
// const uri = "mongodb://localhost:27017";
// const uriOnline = 'mongodb+srv://shmuel:shmuel530@node.bqh56yv.mongodb.net/?retryWrites=true&w=majority'
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     const database = client.db('one');
//     const presidents = database.collection('presidents');
    
//     const query = { name: 'Ronald Reagan' };
//     const president = await presidents.findOne(query);
//     console.log(president);

//     const allPresidents = await presidents.find();
//     //await allPresidents.forEach(console.log);

//     while(await allPresidents.hasNext()) {
//       let p = await allPresidents.next();
//       console.log(p);
//     }

//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://shmuel:shmuel530@node.bqh56yv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    console.log('before connect');
    await client.connect();
    // const database = client.db('sample_airbnb');
    // const listings = database.collection('listingsAndReviews');

    // const allListings = await listings.find();
    // await allListings.forEach(console.log);
    console.log('after connect');
    await listDatabases();

  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);

async function listDatabases() {
  console.log('inside databaase list');
  const results = await client.db().admin().listDatabases();
  // await results.databases.forEach(async db => {
  //   console.log(`----------${db.name}---------`)

  //   await showCollections(db.name);
  // })

  await asynForEach(results.databases, async db => {
    console.log(`----------${db.name}---------`);
    await showCollections(db.name);
  })
}

async function showCollections(dbName) {
  const collection = await client.db(dbName).listCollections();
  await collection.forEach(c => {
    console.log(c.name);
  })
}

async function asynForEach(array, callback) {
  for(let i = 0; i < array.length; i++){
    await callback(array[i], i, array);
  }
}

module.exports = app;