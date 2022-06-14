const { signedCookie } = require('cookie-parser');
const { json } = require('express');
const express = require('express');
const app = require('../app');
const router = express.Router();
const visitsCounter = require('../visitsCounter');

/* GET home page. */
router.get('/', visitsCounter('home page'), function(req, res, next) {
  //const cookies = req.cookies;
  const session = req.session || {};
  const userName = session.userName || 'Stranger';
  res.render('index', { 
    title: 'Index',
    //userName: cookies["userName"] || 'Stranger'
    userName: capitalize(userName)
  });
});

router.post('/', visitsCounter('post name'), function(req, res, next) {
  //res.cookie('userName', req.body.userName, { maxAge: 1000 * 60 * 60 * 24 * 365 })
  req.session.userName = req.body.userName;
  res.redirect('/');
});

router.get('/visits',visitsCounter('visits page'), function(req, res, next) {
  res.render('visits', { 
    title: 'Visits Count',
    visits: global.visits || {}
  });
  console.log(req.visits);
});

function capitalize(string) {
  const words = string.split(' ');
  return words.map(w => {
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }).join(' ');
}

module.exports = router;
