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

router.post('/', async function(req, res, next) {
  try {
    if(!req.body.title || !req.body.body) {
      const error = new Error('Please provide title and body');
      error.statusCode = 400;

      throw error;
    }

    console.log(req.session);
    const newPost = {
      userName: `${req.session.userInfo.firstName} ${req.session.userInfo.lastName}`,
      userId: Mongo.ObjectId(req.session.userInfo._id),
      title: req.body.title,
      body: req.body.body,
      datetime: new Date()
    }

    const theNewPost = await mongoFunctions.addPost(newPost);
    res.send(theNewPost);
  } catch(error) {
    console.error(error);
    return res.status(error.statusCode || 500).send(error.message);
  }

})

router.get('/:id', async function(req, res, next) {
  try {
    const post = await posts.findOne({_id: Mongo.ObjectId(req.params.id)});

    if(!post) {
      const error = new Error('Post not found');
      error.statusCode = 400;
      throw error;
    }
    return res.send(post);
  } catch(error) {
    if(error.message.includes('Argument passed in must be a')){
      error.message = 'Post not found';
      error.statusCode = 400;
    }
    res.status(error.statusCode || 500).send(error.message);
  }
})

module.exports = router;
