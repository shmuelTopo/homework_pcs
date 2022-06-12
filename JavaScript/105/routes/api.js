var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var debug = require('debug')('contacts:route');

// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());

/* GET users listing. */

router.get('/contacts', (req, res, next) => {
  debug('GET /contacts');
  console.log('GET /contacts');
  connection.query('SELECT * FROM contacts', (error, results, fields) => {
    if (error) {
      error.apiError = true;
      error.apiMessage = 'Error getting contacts';
      next(error);
    }

    debug(`get returning ${JSON.stringify(results)}`);
    res.status(200).json(results);
  });
});

router.post('/add-contact', function (req, res, next) {
  const contact = req.body;
  const error = contactIsBad(contact, next);
  if (error) {
    return next(error);
  }
  connection.query(
    'INSERT INTO contacts(first, last, email, phone) VALUES(?, ?, ?, ?)',
    [contact.first, contact.last, contact.email, contact.phone],
    (error, results, fields) => {
      if (error) {
        error.apiError = true;
        error.message = error.sqlMessage.split(' at row')[0];
        return next(error);
      }

      contact.id = results.insertId;
      res.status(201).json(contact);
    }
  );
});

router.get('/add/random', function (req, res, next) {
  let randomContact = require('../getRandomPerson')();

  connection.query(
    'INSERT INTO contacts(first, last, email, phone) VALUES(?, ?, ?, ?)',
    [randomContact.first, randomContact.last, randomContact.email, randomContact.phone],
    (error, results, fields) => {
      if (error) {
        error.apiError = true;
        error.message = error.sqlMessage.split(' at row')[0];
        return next(error);
      }
      randomContact.id = results.insertId;
      res.status(201).json(randomContact);
    }
  );
});

router.put('/edit/:id', function (req, res, next) {
  const error = contactIsBad(req.body, next);
  if (error) {
    return next(error);
  }

  const first = req.body.first;
  const last = req.body.last;
  const email = req.body.email;
  const phone = req.body.phone;
  const id = req.params.id;

  console.log('editContact', id, first, last, email, phone);

  connection.query(
    'UPDATE contacts SET first = ?, last = ?, email = ?, phone = ? WHERE id = ?',
    [first, last, email, phone, id],
    (error, results, fields) => {
      if (error) {
        console.log(error);
        error.apiError = true;
        error.message = error.sqlMessage.split(' at row')[0];
        error.status = 400;

        return next(error);
      }

      if (results.affectedRows === 0) {
        const error = new Error('No contact found with id ' + id);
        error.status = 404;

        error.apiError = true;
        return next(error);
      }

      req.body.id = id;
      res.status(200).json(req.body);
    }
  );
});

router.delete('/delete/:id', function (req, res, next) {
  console.log('removeContact', req.params.id);

  connection.query('DELETE FROM contacts WHERE id = ?', [req.params.id], (error, results, fields) => {
    if (error || results.affectedRows === 0) {
      const error = new Error('No contact found with id ' + req.params.id);
      error.apiError = true;
      error.status = 404;

      return next(error);
    }

    //send a 204 response
    res.status(204).send();
  });
});

router.get('*', function (req, res, next) {
  console.log('req.url', req.url);
  const error = new Error('Not Found');
  error.status = 404;
  return next(error);
});

function contactIsBad(contact) {
  if (!contact.first || !contact.last) {
    const missingFields = [];

    if (!contact.first) {
      missingFields.push('First');
    }

    if (!contact.last) {
      missingFields.push('Last');
    }

    const message = `Missing ${missingFields.join(' and ')}`;

    const error = new Error('Fields first and last are required, ' + message);
    error.apiError = true;
    return error;
  } else {
    return false;
  }
}

module.exports = router;
