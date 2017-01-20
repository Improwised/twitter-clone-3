const express = require('express');

const DB = require('../helpers/db');

const router = express.Router();

var logout = require('express-passport-logout');
var nodemailer = require('nodemailer');
// GET: /

router.get('/welcome', (req, res, next) => {
  res.render('welcome');
})

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {

  var username = req.body.username;
  var password = req.body.password;
  // console.log(username + password);
  // return false;
  // User.manualLogin(username, password, function(error, object) {
  //   if (!object) {
  //     res.redirect('/login');
  //   } else {
  //     req.session.username = object;
  //     if (req.body['remember_me'] == 'true') {
  //       res.cookie('username', object.username, { maxAge: 900000 });
  //       res.cookie('password', object.password, { maxAge: 900000 });
  //     }
  //     // res.redirect('/welcome');
  //     res.send('Hello ' + username);
  //   }
  // })
  // if (username == )

  const query = DB.builder()
    .select()
    .from("users")
    .where('username = ?',username)
    .where('password = ?',password)
    .toParam();
    console.log(query);
    //return false;
  DB.executeQuery(query, (error, results) => {

   if (error) {
     next(error);
     return;
   }
   console.log(results.rows.length);

   if(results.rows.length > 0)
   {
    console.log("Log in successfully");
    res.render('welcome');
   }
   else
   {
    console.log("Log in Not successfully");
   }
   //res.send(results);
  });
})

router.get('/retrive_password', (req, res, next) => {
  res.render('forgot_password');
});

router.get('/retrive_password', (req, res, next) => {

  console.log('email...', req.query.email);

  var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      user: "hemangi@improwised.com",
      pass: "hemangi123"
    }
  });

  var rand, mailOptions, host, link;

  User.getAccountByEmail(req.query.email, function(object) {
    if (object) {
      console.log('email...', object);
      rand = Math.floor((Math.random() * 100) + 54);
      host = req.get('host');
      link = "http://" + req.get('host') + "/verify?id=" + rand;
      mailOptions={
        to : req.query.email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
      }
      console.log(mailOptions);
      smtpTransport.sendMail(mailOptions, function(error, response) {
        if(error) {
          console.log(error);
        } else {
          console.log("Message sent: " + response.message);
          res.end("sent");
        }
      });
    } else {
      res.render('forgot_password');
    }
  });
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
     console.log("-->", query);
    DB.executeQuery(query, (error, results) => {

     if (error) {
       next(error);
       return;
     }
     res.render('register');
    });
  // res.send('Hello ' + username + ' Phone ' + mobileno + ' Email ' + email);
  }
});

router.get('/tweet', (req, res, next) => {
  res.render();
});

router.post('/tweet', (req, res, next) => {
  var tweet = req.body.tweet;

  const query = DB.builder()
  .insert()
  .into("tweet")
  .set("tweet", tweet)
  .toParam();

  console.log("-->", query);

  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    res.render('welcome');
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(function(e) {
    res.clearCookie('myCookie');
    req.logout();
    res.redirect('/login');
  });
});
module.exports = router;
