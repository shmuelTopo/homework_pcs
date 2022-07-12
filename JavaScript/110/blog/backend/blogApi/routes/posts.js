var express = require('express');
var router = express.Router();


const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);
const database = client.db('blog');
const posts = database.collection('posts');
const users = database.collection('users');

async function getPosts() {
  const blogs = await posts.find().toArray();
  return blogs;
}

/* GET all the posts. */
router.get('/', async function(req, res, next) {
  console.log('getting posts');
  try {
    const posts = await getPosts().catch(console.dir);
    return res.send(posts);
  } catch(error) {
    res.statusCode = error.statusCode || 500;
    return res.status(error.statusCode || 500).send(error.message);
  }
});

router.post('/', async function(req, res, next) {
  try {
    console.log(req.body);
    if(!req.body.userid || !req.body.header || !req.body.text) {
      const error = new Error('Please provide uesrid header and text');
      error.statusCode = 400;

      throw error;
    }

    let user;
    try {
      user = await users.findOne({_id: ObjectId(req.body.userid)});
    } catch { }

    if(!user) {
      const error = new Error('User does not exists');
      error.statusCode = 400;
      throw error;
    }
    
    const results = await posts.insertOne({
      userid: user._id,
      header: req.body.header, 
      text: req.body.text,
      datetime: new Date()
    })

    if(!results.acknowledged) {
      throw new Error('Something went wrong');
    }
    res.send({
      insertedId: results.insertedId
    });
  } catch(error) {
    return res.status(error.statusCode || 500).send(error.message);
  }

})

router.get('/:id', async function(req, res, next) {
  try {
    const post = await posts.findOne({_id: new ObjectId(req.params.id)});

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
