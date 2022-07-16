const express = require('express');
const router = express.Router();
const mongoFunctions = require('../mongoFunctions');
const Mongo = require("mongodb");

/* GET all the posts. */
router.get('/', async function(req, res, next) {
  try {
    const posts = await mongoFunctions.getPosts().catch(console.dir);
    return res.send(posts);
  } catch(error) {
    console.log(error);
    res.statusCode = error.statusCode || 500;
    return res.status(error.statusCode || 500).send(error.message);
  }
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
      const error = new Error('Please provide title and body');
      error.statusCode = 400;

      throw error;
    }

    const newPost = {
      author: `${req.session.userInfo.firstName} ${req.session.userInfo.lastName}`,
      userId: Mongo.ObjectId(req.session.userInfo._id),
      title: req.body.title,
      body: req.body.body,
      datetime: new Date()
    }

    const theNewPost = await mongoFunctions.addPost(newPost);
    socketIo.emit('post', theNewPost);

    res.send(theNewPost);
  } catch(error) {
    console.error(error);
    return res.status(error.statusCode || 500).send(error.message);
  }

})


router.post('/:postId', async function(req, res, next) {
  try {
    if(!req.body.body) {
      const error = new Error('Please provide body');
      error.statusCode = 400;

      throw error;
    }

    const newComment = {
      author: `${req.session.userInfo.firstName} ${req.session.userInfo.lastName}`,
      userId: Mongo.ObjectId(req.session.userInfo._id),
      postId: Mongo.ObjectId(req.params.postId),
      body: req.body.body,
      datetime: new Date()
    }

    const theNewComment = await mongoFunctions.addComment(newComment);
    socketIo.emit('comment', theNewComment);
    res.send(theNewComment);
  } catch(error) {
    console.error(error);
    return res.status(error.statusCode || 500).send(error.message);
  }

})

module.exports = router;
