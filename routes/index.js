const express = require('express');

const DB = require('../helpers/db');

const router = express.Router();

// GET: /
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const mobileno = req.body.mobileno;
  const password = req.body.password;

  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('mobileno', 'Mobile No is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('confirmpassword', 'Password do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    console.log('FAILED');
    res.render('register', {
      errors: errors,
    });
  } else {
    const query = DB.builder()
    .insert()
    .into("users")
    .set("username", username)
    .set("email", email)
    .set("mobilenumber", mobileno)
    .set("password", password)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      res.redirect('/profilepictureupload');
    });
  }
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/welcome', (req, res, next) => {
  res.render('welcome');
});

router.get('/profilechange', (req, res, next) => {
  res.render('profilechange');
});

router.get('/profilepictureupload', (req, res, next) => {
  res.render('profilepictureupload');
});
module.exports = router;
