const express = require('express');

const DB = require('../helpers/db');

const router = express.Router();

// GET: /

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  // User.manualLogin(req.body['uid'], req.body['pwd'], function(error, object) {
  //   if (!object) {
  //     res.redirect('/login');
  //   } else {
  //     req.session.uid = object;
  //     if (req.body['remember_me'] == 'true') {
  //       res.cookie('uid', object.uid, { maxAge: 900000 });
  //       res.cookie('pwd', object.pwd, { maxAge: 900000 });
  //     }
  //     res.redirect('/welcome');
  //   }
  // })
  var username = req.body.username;
  var password = req.body.password;

  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  var errors = req.validationErrors();

  if(errors) {
    console.log('FAILED');
    res.render('register', {
      errors : errors
    });
  } else {
    // const query = DB.builder()
    //   .select()
    //   .from("users")
    //   .field("username")
    //   .field("password")
    //   .toString();
    // DB.executeQuery(query, (error, results) => {

    //  if (error) {
    //    next(error);
    //    return;
    //  }
    //  console.log(results);
    // });
    res.send('Hello ' + username);
  }

})

router.get('/retrive_password', (req, res, next) => {
  console.log('email...', req.query.email);
  User.getAccountByEmail(req.query.email, function(object) {
    if (object) {
      console.log('email...', object);
      rand = Math.floor((Math.random() * 100) + 54);
      host = req.get('host');
      link = "http://" + req.get('host') + "/verify?id=" + rand;

    }
  })
})

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
    .into("users")
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
});

module.exports = router;
