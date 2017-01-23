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
      res.redirect('/welcome');
    });
  }
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/welcome', (req, res, next) => {
  const a = DB.builder()
  .select()
  .from("users")
  .where("user_id NOT IN ?",
  DB.builder()
  .select()
  .field("follower_id")
  .from("follower")
  .where("login_user_id = ?", 1))
  .toParam();
  DB.executeQuery(a, (error, follow) => {
    if (error) {
      next(error);
      return;
    }
    res.render('welcome', {
      users: follow.rows,
    });
  });
});

router.get('/profilechange', (req, res, next) => {
  const query = DB.builder()
  .select()
  .field('username')
  .field('follower_id')
  .field('user_id')
  .field('id')
  .from('users', 'r')
  .join(DB.builder()
  .select()
  .from('follower'), 'f', 'r.user_id = f.follower_id')
  .toParam();
  DB.executeQuery(query, (error, users) => {
    if (error) {
      next(error);
      return;
    }
    res.render('profilechange', {
      results: users.rows,
    });
  });
});

router.get('/profilepictureupload', (req, res, next) => {
  res.render('profilepictureupload');
});

router.post('/follower', (req, res, next) => {
  const id = req.body.followerId;
  const query = DB.builder()
  .insert()
  .into("follower")
  .set("login_user_id", 1)
  .set('follower_id', id)
  .toParam();
  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    res.redirect('/welcome');
  });
});

router.post('/unfollow', (req, res, next) => {
  const id = req.body.followerId;
  const query = DB.builder()
  .delete()
  .from("follower")
  .where("id = ?", id)
  .toParam();
  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    res.redirect("/profilechange");
  });
});
module.exports = router;
