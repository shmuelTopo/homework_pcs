const { MongoClient, ObjectId, countDocuments } = require("mongodb");
const bcrypt = require('bcrypt');
const { post } = require("jquery");

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);
const database = client.db('blog');
const posts = database.collection('posts');
const users = database.collection('users');

module.exports.getPosts = async () => {
  await client.connect();
  const blogs = await posts.find().toArray();
  await client.close();
  return blogs;
}

module.exports.addPost = async (newPost) => {
  await client.connect();
  const results = await posts.insertOne(newPost);
  await client.close();

  if(!results.acknowledged) {
    throw new Error('Something went wrong');
  }
  newPost.id = results.insertedId;
  return newPost;
}

module.exports.login = async (email, firstName, lastName, password, method) => {
  
  if (!email || !password || !method) {
    throw new Error('Please provide all fields');
  }

  if(method === 'signup' && ( !firstName || !lastName)){
    throw new Error('Please provide all fields');
  }

  let user;
  if(method === 'login') {
    user = await checkUser(email, password);
  } else if(method === 'signup') {
    const userExists = await isUser(email);
    if(userExists) {
      const err = new Error('Account with this email already exists');
      err.statusCode = 401;
      throw err;
    }
    user = await addUser(email, firstName, lastName, password);
  }
  
  return user;
};

async function isUser(email) {
    await client.connect();
    const count = await users.countDocuments({ email });
    await client.close();
    return count >= 1;
}

async function addUser(email, firstName, lastName, password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      firstName,
      lastName,
      psw_hash: hash
    };
    await client.connect();
    const results = await users.insertOne(newUser);
    await client.close();
    delete newUser.psw_hash;
    return newUser;
  } catch(error) {
    error.message = error.code === 'ER_DUP_ENTRY' ? 'Username already exists' : error.message;
    (error.message);
    throw error;
  }
}

async function checkUser(email, password) {
  await client.connect();
  const user = await users.findOne({ email });
  await client.close()
  let match;
  if(user) {
    match = await bcrypt.compare(password, user.psw_hash);
  }
    
  if(!match) {
    const err = new Error('Invalid username or password');
    err.statusCode = 401;
    throw err;
  }

  delete user.psw_hash;
  return user;
}
