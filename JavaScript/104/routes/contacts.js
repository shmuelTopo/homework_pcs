var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var debug = require('debug')('contacts:route');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

let idCounter = 1;

let contacts = [];

/* GET users listing. */

router.get('/', (req, res, next) => {
  connection.query('SELECT * FROM contacts', (error, results, fields) => {
    if (error) next(error);

    debug(`get returning ${JSON.stringify(results)}`);
    console.log(results);
    console.log('inside get');
    res.render('contacts', {
      title: 'Contacts',
      contacts: results
    });
  });
});

router.get('/addContact', function (req, res, next) {
  res.render('contactForm', {});
});

router.get('/addRandom', function (req, res, next) {
  let randomContact = require('../getRandomPerson')();

  connection.query(
    'INSERT INTO contacts(first, last, email, phone) VALUES(?, ?, ?, ?)',
    [randomContact.first, randomContact.last, randomContact.email, randomContact.phone],
    (error, results, fields) => {
      if (error) next(error);

      console.log(results);
      console.log('works');

      res.redirect('/contacts');
    }
  );
});

router.post('/addContact', function (req, res, next) {
  const contact = req.body;

  connection.query('INSERT INTO contacts(first, last, email, phone) VALUES(?, ?, ?, ?)',
    [contact.first, contact.last, contact.email, contact.phone],
    (error, results, fields) => {
      if (error) next(error);

      console.log(results);
      console.log('works');

      res.redirect('/contacts');
    }
  );
});

router.get('/remove/:id', function (req, res, next) {
  console.log('removeContact', req.params.id);

  connection.query('DELETE FROM contacts WHERE id = ?',[req.params.id], (error, results, fields) => {
    if (error) next(error);

    if (results.affectedRows === 0) {
      return next(new Error('No contact found with id ' + req.params.id));
    }

    res.redirect('/contacts');
  });
});

router.get('/edit/:id', function (req, res, next) {
  connection.query(`SELECT * FROM contacts WHERE id = ${req.params.id}`, (error, results, fields) => {
    if (error) next(error);

    if (!results.length) {
      return next(new Error('No contact found with id ' + req.params.id));
    }

    debug(`get returning ${JSON.stringify(results)}`);
    console.log(results);
    console.log('inside get');
    res.render('contactForm', {
      contact: results[0]
    });
  });
});

router.post('/edit/:id', function (req, res, next) {
  const first = req.body.first;
  const last = req.body.last;
  const email = req.body.email;
  const phone = req.body.phone;
  const id = req.params.id;

  console.log('editContact', id, first, last, email, phone);

  connection.query('UPDATE contacts SET first = ?, last = ?, email = ?, phone = ? WHERE id = ?',
    [first, last, email, phone, id],
    (error, results, fields) => {
      if (error) next(error);

      console.log('inside update');
      res.redirect('/contacts');
    }
  );
});


module.exports = router;
