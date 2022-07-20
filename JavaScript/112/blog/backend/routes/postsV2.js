const express = require('express');
const router = express.Router();
const mongoFunctions = require('../mongoFunctions');
const { MongoClient, ObjectId, ISODate, countDocuments } = require("mongodb");


const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);
const database = client.db('blog');
const posts = database.collection('posts');

router.get('/', async function(req, res, next) {

  await client.connect();
  const { page, limit, newestpostid } = req.query;
  const theLimit = !limit ? 0 : Number(limit);
  let query = {};

  if(newestpostid) {
    if(!ObjectId.isValid(newestpostid)) {
      return res.status(404).end(`wrong fromat id ${newestpostid}`);
    }
    const newestPostDate = await posts.findOne(
      { _id: ObjectId(newestpostid) }, 
      { projection: { datetime: 1 } }
    );
    if(!newestPostDate) {
      return res.status(404).end(`can't find blog post with id ${newestpostid}`);
    }
    query = { 
      datetime: { $lt: new Date(newestPostDate.datetime) } 
    };
  }

  const numOfDocuments = await posts.countDocuments(query);

  const postsResponse = {};
  postsResponse.posts = await posts.find(query).sort({datetime: -1}).limit(theLimit).toArray();
  if(theLimit) {
    postsResponse.nextPostsCount = numOfDocuments - theLimit > 0 ? numOfDocuments - theLimit : 0;
  }

  if(postsResponse.nextPostsCount) {
    const lastPostId = postsResponse.posts[theLimit -1]._id.toString();
    postsResponse.nextPageReq = `${req.protocol}://${req.get('host')}/posts?limit=${limit}&lastshownpostid=${lastPostId}`;
  }

  client.close();
  res.status(200).json(postsResponse);
});

router.use((req, res, next) => {
  if(!req.session.userInfo?.authenticated) {
    return res.status(401).end('you are not logged in');
  }
  next();
});

router.post('/', async function(req, res, next) {
  try {
    if(!req.body.title || !req.body.body) {
      return res.status(400).end('title and body are required');
    }

    const newPost = {
      author: `${req.session.userInfo.firstName} ${req.session.userInfo.lastName}`,
      userId: ObjectId(req.session.userInfo._id),
      title: req.body.title,
      body: req.body.body,
      datetime: new Date()
    }
    await client.connect();
    const results = await posts.insertOne(newPost);
    if(!results.acknowledged) {
      throw new Error();
    }
    socketIo.emit('post', newPost);

    res.status(200).send(newPost);
    console.log('after end');

    await client.close();

  } catch(error) {
    console.error(error.message);
    return res.status(500).end('error adding post');
  }

})


router.post('/:postId', async function(req, res, next) {
  
  if(!req.body.body) {
    return res.status(400).end('body is required');
  }

  if(!ObjectId.isValid(req.params.postId)) {
    return res.status(404).end('post id is not valid');
  }

  const newComment = {
    author: `${req.session.userInfo.firstName} ${req.session.userInfo.lastName}`,
    userId: ObjectId(req.session.userInfo._id),
    postId: ObjectId(req.params.postId),
    body: req.body.body,
    datetime: new Date()
  }

  try {
    await client.connect();
    const results = await posts.updateOne({ _id: newComment.postId}, { $push: { comments: newComment}});
    if(!results.acknowledged) {
      return res.status(404).end('post not found');
    }
    await client.close();
  } catch(error) {
    return res.status(500).end('error adding comment');
  }

  socketIo.emit('comment', newComment);
  res.status(200).send(newComment);

})

module.exports = router;
