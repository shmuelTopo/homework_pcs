const express = require('express');
const router = express.Router();
const sqlPool = require('../sqlPool.js');

/* GET home page. */
router.route('/')
  .get(function (req, res, next) {
    sqlPool.query('SELECT * FROM recipes', (err, results, fields) => {
      if (err) {
        err.message = 'Error querying database';
        return res.send(err.message);
      }
      return res.json(results);
    });
  })
  .post(function (req, res, next) {
    const { name, category, prep_time, cook_time, servings } = req.body;
    sqlPool.query(
      'INSERT INTO recipes (name, category, prep_time, cook_time, servings) VALUES (?,?,?,?,?)',
      [name, category, prep_time, cook_time, servings],
      (err, results, fields) => {
        if (err) {
          err.message = 'Error querying database';
          return res.send(err.message);
        }

        req.body.id = results.insertId;
        return res.json(req.body);
      }
    );
  });

router.route('/:id')
  .get(function (req, res, next) {
    sqlPool.query('SELECT * FROM recipes WHERE id = ?', [req.params.id], (err, results, fields) => {
      if (err) {
        err.message = 'Error querying database';
        return res.send(err.message);
      }
      const recipe = Object.assign({}, results[0]);

      sqlPool.query('SELECT * FROM ingredients WHERE recipe_id = ?', [req.params.id], (err, results, fields) => {
        console.log(results);
        if (err) {
          err.message = 'Error querying database';
          throw err;
        }
        recipe.ingredients = results.map(ingredient => {
          return {
            name: ingredient.name, 
            quantity: ingredient.quantity
          }
        });
        return res.json(recipe);
      });
    });
  })
  .put(function (req, res, next) {
    const { name, category, prep_time, cook_time, servings } = req.body;
    sqlPool.query(
      'UPDATE recipes SET name = ?, category = ?, prep_time = ?, cook_time = ?, servings = ? WHERE id = ?',
      [name, category, prep_time, cook_time, servings, req.params.id],
      (err, results, fields) => {
        if (err) {
          err.message = 'Error querying database';
          return res.send(err.message);
        }
        req.body.id = req.params.id;
        return res.json(req.body);
      }
    );
  })
  .delete(function (req, res, next) {
    sqlPool.query('DELETE FROM recipes WHERE id = ?', [req.params.id], (err, results, fields) => {
      if (err) {
        err.message = 'Error querying database';
        return res.send(err.message);
      }
      return res.status(204).send();
    });
  })


router.route('/ingredients/:recipe_id')
  .get(function (req, res, next) {
    const { name, category, prep_time, cook_time, servings } = req.body;
    sqlPool.query(
      'SELECT * FROM ingredients WHERE recipe_id = ?',
      [req.params.recipe_id],
      (err, results, fields) => {
        if (err) {
          return res.send(err.message);
        }

        return res.json(results);
      }
    );
  })
  .post(function (req, res, next) {
    const { name, quantity } = req.body;
    sqlPool.query(
      'INSERT INTO ingredients (recipe_id, name, quantity) VALUES (?,?,?)',
      [req.params.recipe_id, name, quantity],
      (err, results, fields) => {
        if (err) {
          //check if error is caused by no foriegn key
          if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            err.message = 'Recipe not found';
            console.log(err.message);
            err.code = 404;
          } else {
            //err.message = 'Error querying database';
            err.code = 500;
            console.log(err.message);
          }

          return res.status(err.code || 500).send(err.message);
        }

        //return the newly created ingredient
        return res.json({
          name: name,
          quantity: quantity,
          recipe_id: req.params.recipe_id
        });
      }
    );
  });



module.exports = router;
