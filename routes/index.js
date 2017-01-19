const express = require('express');

const DB = require('../helpers/db');

const router = express.Router();

// GET: /

router.get('/login', (req, res, next) => {
  // Constuct and run a simple query
  // const query = DB.builder()
  //   .select()
  //   .function('NOW()')
  //   .toParam();

  // DB.executeQuery(query, (error, results) => {
  //   if (error) {
  //     next(error);
  //     return;
  //   }
  res.render('login');
  //   res.render('index', {
  //     title: `Time from the database is ${results.rows[0].now}`,
  //   });
  // });
});

router.post('/login', (req, res, next) => {

})

module.exports = router;
