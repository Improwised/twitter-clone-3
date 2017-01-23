const express = require('express');

const DB = require('../helpers/db');

const router = express.Router();

const logout = require('express-passport-logout');
const nodemailer = require('nodemailer');
// GET: /

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let query;

  query = DB.builder()
    .select()
    .from('users')
    .where('username = ?', username)
    // .where('password = ?', password)
    .toParam();
  console.log(query);

  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    console.log(results.rowCount);

    if (results.rowCount) {
      query = DB.builder()
      .select()
      .from('users')
      .where('username = ?', username)
      .where('password = ?', password)
      .toParam();
      console.log(query);
      DB.executeQuery(query, (err, results1) => {
        if (err) {
          next(err);
          return;
        }
        console.log(results1.rowCount);

        if (results1.rowCount) {
          console.log(username);
          req.session.username = username;
          req.session.user_id = results1.rows[0].id;
          console.log(req.session.user_id);
          console.log(req.session);
          console.log('Log in successfully');

          console.log('====>', results1.rows);
          res.redirect('/welcome');
        } else {
          console.log('username or password is incorrect');
          res.redirect('login');
        }
      });
    } else {
      console.log('Log in Not successfully');
      res.redirect('/register');
    }
  });
});

router.get('/retrive_password', (req, res) => {
  res.render('forgot_password');
});

router.get('/retrive_password', (req, res) => {
  console.log('email...', req.query.email);

  const smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: 'hemangi@improwised.com',
      pass: 'hemangi123',
    },
  });

  let rand;
  let mailOptions;
  let host;
  let link;

  User.getAccountByEmail(req.query.email, (object) => {
    if (object) {
      console.log('email...', object);
      rand = Math.floor((Math.random() * 100) + 54);
      host = req.get('host');
      link = `http:// ${req.get('host')} /verify?id= ${rand}`;
      mailOptions = {
        to: req.query.email,
        subject: 'Please confirm your Email account',
        html: `Hello,<br> Please Click on the link to verify your email.<br><a href= ${link} >Click here to verify</a>`,
      };
      console.log(mailOptions);
      smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Message sent: ${response.message}`);
          res.end('sent');
        }
      });
    } else {
      res.render('forgot_password');
    }
  });
});

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
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
      errors,
    });
  } else {
    const query = DB.builder()
    .insert()
    .into('users')
    .set('username', username)
    .set('email', email)
    .set('mobilenumber', mobileno)
    .set('password', password)
    .toParam();

    console.log('-->', query);
    DB.executeQuery(query, (error) => {
      if (error) {
        next(error);
        return;
      }
      res.render('register');
    });
  // res.send('Hello ' + username + ' Phone ' + mobileno + ' Email ' + email);
  }
});

router.get('/tweet', (req, res) => {
  res.render();
});

router.post('/tweet', (req, res, next) => {
  const tweet = req.body.tweet;
  const session = req.session;

  const query = DB.builder()
  .insert()
  .into('tweet')
  .set('tweet', tweet)
  .set('userid', session.user_id)
  .toParam();

  console.log('-->', query);

  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }
    res.redirect('/welcome');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  });

  // req.session.destroy((e) => {
  //   if (e) {
  //     console.log(e);
  //   } else {
    // console.log('destroyed --->>', req.session.id);
    // res.clearCookie('myCookie');
    // req.logout();
  //     res.redirect('/login');
  //   }
  // });
});

router.get('/welcome', (req, res, next) => {
  const session = req.session;
  if (session.username) {
    const query = DB.builder()
    .select()
    .from('users')
    .where('username = ?', session.username)
    .toParam();

    console.log('-->', query);
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      res.render('welcome', {
        results: results.rows[0],
      });
    });
  } else {
    res.write('<h1>Please login first.</h1>');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/profilechange', (req, res) => {
  res.render('profilechange');
});

router.get('/profilepictureupload', (req, res) => {
  res.render('profilepictureupload');
});
module.exports = router;
