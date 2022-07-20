var express = require('express');
var router = express.Router();
const mongoFunctions = require('../mongoFunctions');

router.post('/', async (req, res, next) => {
  try {
    const { email, firstName, lastName, password, method } = req.body;
    
    const user = await mongoFunctions.login(email, firstName, lastName, password, method);
    req.session.authenticated = true;
    req.session.userInfo = user;

    user.authenticated = true;
    res.cookie('user', user);
    res.status(200).json(user);
  } catch(err) {
    console.error('login error', err.message);
    req.session.authenticated = false;
    req.session.user = null;
    res.clearCookie('username');
    res.clearCookie('userId');
    return res.status(err.statusCode || 500).end(err.message || 'Something went wrong');
  }

});

module.exports = router;