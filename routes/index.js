const express = require('express');

const DB = require('../helpers/db');

const router = express.Router();

// GET: /
router.get('/', (req, res, next) => {
  res.render('index')
});

router.get('/register', (req, res, next) => {
  res.render('register')
});

router.post('/register', (req, res, next) => {

  var username = req.body.username;
  var email = req.body.email;
  var mobileno = req.body.mobileno;
  var username = req.body.username;
  var password = req.body.password;
  //console.log(mobileno);

  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('mobileno', 'Mobile No is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('confirmpassword', 'Password do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors) {
    console.log('FAILED');
    res.render('register', {
      errors : errors
    });
  } else {
    const query = DB.builder()
    .insert()
    .into("registeruser")
    .set("username", username)
    .set("email", email)
    .set("mobilenumber", mobileno)
    .set("password", password)
    .toParam();
     // console.log("-->", query);
    DB.executeQuery(query, (error, results) => {

   if (error) {
     next(error);
     return;
   }
    res.render('/login')
  });
  }

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
module.exports = router;
