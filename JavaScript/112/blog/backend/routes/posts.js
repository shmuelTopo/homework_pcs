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
  const { postsperpage, cursorpostid, direction } = req.query;

  //check if postsperpage is a number
  if (postsperpage && isNaN(postsperpage)) {
    return res.status(400).send('postsperpage most be a number');
  }
  let limit = Number(postsperpage) || 20;
  
  if(limit > 20 || limit < 1) {
    return res.status(400).send('postsperpage most be between 1 and 20');
  }

  let query = {};
  if(cursorpostid) {
    try {
      const lastPostDatetime = await posts.findOne({_id: ObjectId(cursorpostid)}, { projection: {datetime: 1, _id: 0}});
      if(!lastPostDatetime) {
        return res.status(404).end(`can't find blog post with id ${cursorpostid}`);
      }
      if(direction === 'next') {
        query = { 
          datetime: { $lt: new Date(lastPostDatetime.datetime) } 
        };
      } else if(direction === 'prev') {
        query = { 
          datetime: { $gt: new Date(lastPostDatetime.datetime) } 
        };
      } else {
        return res.status(400).end(`wrong direction ${direction}`);
      }
    } catch(e) {
      return res.status(404).end(`wrong fromat id ${cursorpostid}`);
    } 
  }
  const numOfDocuments = await posts.countDocuments(query);

  const postsResponse = {};
  if(direction === 'next' || !direction) {
    postsResponse.posts = await posts.find(query).sort({datetime: -1}).limit(limit).sort({datetime: -1}).toArray();
  } else {
    postsResponse.posts = await posts.find(query).sort({datetime: 1}).limit(limit).toArray();
    postsResponse.posts.reverse();
  }

  const hasMoreOnSameDirection = numOfDocuments > postsResponse.posts.length;

  const lastPostid = postsResponse.posts[postsResponse.posts.length - 1]._id;
  const firstPostid = postsResponse.posts[0]._id;

  const baseUrl = `${req.protocol}://${req.get('host')}/posts?postsperpage=${limit}`;
  if(direction === 'next') {
    postsResponse.prevUrl = `${baseUrl}&direction=prev&cursorpostid=${firstPostid}`;
    if(hasMoreOnSameDirection) {
      postsResponse.nextUrl = `${baseUrl}&direction=next&cursorpostid=${lastPostid}`;
    }
  } else if(direction === 'prev') {
    postsResponse.nextUrl = `${baseUrl}&direction=next&cursorpostid=${lastPostid}`;
    if(hasMoreOnSameDirection) {
      postsResponse.prevUrl = `${baseUrl}&direction=prev&cursorpostid=${firstPostid}`;
    }
  } else  {
    if(hasMoreOnSameDirection) {
      postsResponse.nextUrl = `${baseUrl}&direction=next&cursorpostid=${lastPostid}`;
    }
  }

  if(postsResponse.nextPostsCount) {
    const lastPostId = postsResponse.posts[limit -1]._id.toString();
    postsResponse.nextPageReq = `${req.protocol}://${req.get('host')}/posts?postsperpage=${limit}&cursorpostid=${lastPostId}&direction=next`;
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
