const express = require('express');
const path = require('path');
const multer = require('multer');
const DB = require('../helpers/db');

const router = express.Router();

const upload = multer({ dest: path.resolve(__dirname, '../public/images/') });

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/profile/:id', (req, res, next) => {
  const profileid = req.params.id;
  const session = req.session;
  let query;
  if(session.user_id) {
    if (profileid == session.user_id) {
      res.redirect('/profilechange');
    } else {
      query = DB.builder()
      .select()
      .from('users')
      .where('user_id = ?', profileid)
      .toParam();
      DB.executeQuery(query, (error, profile) => {
        if (error) {
          next(error);
          return;
        }
        query = DB.builder()
          .select()
          .field('tweet')
          .field('time')
          .field('username')
          .field('image')
          .field('imagetweet')
          .field('user_id')
          .field('id')
          .from('tweet', 't')
          .join(DB.builder()
          .select()
          .from('users'), 'u', 't.userid = u.user_id')
          .where('user_id = ?', profileid)
          .order('time', false)
          .toParam();
          DB.executeQuery(query, (errorusers, tweets) => {
            if (errorusers) {
              next(errorusers);
              return;
            }
            query = DB.builder()
            .select()
            .from('follower')
            .where('login_user_id = ?', profileid)
            .toParam();
            DB.executeQuery(query, (errorusers, c) => {
              if (errorusers) {
                next(errorusers);
                return;
              }
              res.render('profile', {
                profile: profile.rows[0],
                count: c.rows.length,
                tweets: tweets.rows,
              });
            });
          });
      });
    }
  } else {
    res.redirect('/login');
  }
});

router.get('/followers', (req, res) => {
  const session = req.session;
  let query;
  if (session.user_id) {
    query = DB.builder()
    .select()
    .from('users')
    .where('user_id = ?', session.user_id)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      query = DB.builder()
      .select()
      .field('username')
      .field('follower_id')
      .field('user_id')
      .field('image')
      .field('id')
      .from('users', 'r')
      .join(DB.builder()
      .select()
      .from('follower'), 'f', 'r.user_id = f.follower_id')
      .where('login_user_id = ?', session.user_id)
      .toParam();
      DB.executeQuery(query, (errorresults, users) => {
        if (errorresults) {
          next(errorresults);
          return;
        }
        query = DB.builder()
        .select()
        .from('follower')
        .where('login_user_id = ?', session.user_id)
        .toParam();
        DB.executeQuery(query, (errorusers, c) => {
          if (errorusers) {
            next(errorusers);
            return;
          }
          res.render('followers', {
            count: c.rows.length,
            users: users.rows,
            results: results.rows,
          });
        });
      });
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/login', (req, res, next) => {
  const email = req.sanitize('email').trim();
  const password = req.sanitize('password').trim();
  if (req.body.email) {
    req.checkBody('email', 'Email is not valid').isEmail();
  } else {
    req.checkBody('email', 'Email is required').notEmpty();
  }
  req.checkBody('password', 'Password is required').notEmpty();
  const session = req.session;

  let query;

  const errors = req.validationErrors();

  if (errors) {
    res.render('login', {
      errors,
    });
  } else {
    query = DB.builder()
    .select()
    .from('users')
    .where('email = ?', email)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }

      if (results.rowCount) {
        query = DB.builder()
        .select()
        .from('users')
        .where('email = ?', email)
        .where('password = ?', password)
        .toParam();
        DB.executeQuery(query, (err, results1) => {
          if (err) {
            next(err);
            return;
          }

          if (results1.rowCount) {
            session.user_id = results1.rows[0].user_id;
            res.redirect('/welcome');
          } else {
            res.redirect('/login');
          }
        });
      } else {
        res.redirect('/register');
      }
    });
  }
});

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', upload.single('profile'), (req, res, next) => {
  const username = req.sanitize('username').trim();
  const email = req.sanitize('email').trim();
  const mobilenumber = req.sanitize('mobilenumber').trim();
  const password = req.sanitize('password').trim();

  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('mobilenumber', 'Mobile Number is required').notEmpty();
  if (req.body.email) {
    req.checkBody('email', 'Email is not valid').isEmail();
  } else {
    req.checkBody('email', 'Email is required').notEmpty();
  }
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('confirmpassword', 'Password do not match').equals(password);

  const errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors,
    });
  } else {
    let photo = '';

    if (req.file) {
      photo = req.file.filename;
    } else {
      photo = 'cover.jpg';
    }

    const query = DB.builder()
    .insert()
    .into('users')
    .set('username', username)
    .set('email', email)
    .set('image', photo)
    .set('mobilenumber', mobilenumber)
    .set('password', password)
    .toParam();

    DB.executeQuery(query, (error) => {
      if (error) {
        next(error);
        return;
      }
      res.redirect('/login');
    });
  }
});

router.post('/tweet', upload.single('imagetweet'), (req, res, next) => {
  const tweet = req.body.tweet;
  const session = req.session;
  req.checkBody('tweet', 'Invalid length of tweet min= 8 max= 140').notEmpty().len(2, 140);

  const errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors,
    });
  } else {
    let photo = '';
    if (req.file) {
      photo = req.file.filename;
    } else {
      photo = '';
    }
    const query = DB.builder()
    .insert()
    .into('tweet')
    .set('tweet', tweet)
    .set('userid', session.user_id)
    .set('imagetweet', photo)
    .toParam();
    DB.executeQuery(query, (error) => {
      if (error) {
        next(error);
        return;
      }
      res.redirect('/welcome');
    });
  }
});

router.get('/deletetweet/:id', (req, res, next) => {
  const tweetid = req.params.id;
  const query = DB.builder()
  .delete()
  .from('tweet')
  .where('id = ?', tweetid)
  .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }
    res.redirect('/profilechange');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

router.get('/welcome', (req, res, next) => {
  const session = req.session;
  let query;
  if (session.user_id) {
    query = DB.builder()
    .select()
    .from('users')
    .where('user_id = ?', session.user_id)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }

      query = DB.builder()
      .select()
      .from('users')
      .where('user_id != ?', session.user_id)
      .where('user_id NOT IN ?',
      DB.builder()
      .select()
      .field('follower_id')
      .from('follower')
      .where('login_user_id = ?', session.user_id))
      .toParam();
      DB.executeQuery(query, (errorresults, follow) => {
        if (errorresults) {
          next(errorresults);
          return;
        }
        query = DB.builder()
        .select()
        .field('username')
        .field('tweet')
        .field('imagetweet')
        .field('time')
        .field('id')
        .field('user_id')
        .field('image')
        .from('users', 'u')
        .join(DB.builder().select().from('tweet'), 't', 'u.user_id = t.userid')
        .where('u.user_id IN ? OR u.user_id= ? ',
        (DB.builder()
        .select()
        .field('follower_id')
        .from('follower')
        .where('login_user_id = ?', session.user_id)), session.user_id)
        .order('time', false)
        .toParam();
        DB.executeQuery(query, (errorfollow, tweets) => {
          if (errorfollow) {
            next(errorfollow);
            return;
          }
          query = DB.builder()
          .select()
          .from('follower')
          .where('login_user_id = ?', session.user_id)
          .toParam();
          DB.executeQuery(query, (errortweets, c) => {
            if (errortweets) {
              next(errortweets);
              return;
            }
            res.render('welcome', {
              count: c.rows.length,
              follow: follow.rows,
              results: results.rows,
              tweets: tweets.rows,
            });
          });
        });
      });
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/profilechange', (req, res, next) => {
  const session = req.session;
  let query;
  if (session.user_id) {
    query = DB.builder()
    .select()
    .from('users')
    .where('user_id = ?', session.user_id)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      query = DB.builder()
      .select()
      .field('username')
      .field('follower_id')
      .field('user_id')
      .field('image')
      .field('id')
      .from('users', 'r')
      .join(DB.builder()
      .select()
      .from('follower'), 'f', 'r.user_id = f.follower_id')
      .where('login_user_id = ?', session.user_id)
      .toParam();
      DB.executeQuery(query, (errorresults, users) => {
        if (errorresults) {
          next(errorresults);
          return;
        }
        query = DB.builder()
        .select()
        .field('tweet')
        .field('time')
        .field('username')
        .field('image')
        .field('imagetweet')
        .field('user_id')
        .field('id')
        .from('tweet', 't')
        .join(DB.builder()
        .select()
        .from('users'), 'u', 't.userid = u.user_id')
        .where('user_id = ?', session.user_id)
        .order('time', false)
        .toParam();
        DB.executeQuery(query, (errorusers, tweets) => {
          if (errorusers) {
            next(errorusers);
            return;
          }
          query = DB.builder()
          .select()
          .from('follower')
          .where('login_user_id = ?', session.user_id)
          .toParam();
          DB.executeQuery(query, (errortweets, c) => {
            if (errortweets) {
              next(errortweets);
              return;
            }
            res.render('profilechange', {
              count: c.rows.length,
              tweets: tweets.rows,
              users: users.rows,
              results: results.rows,
            });
          });
        });
      });
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/profilepictureupload', (req, res, next) => {
  const session = req.session;
  let query;
  if (session.user_id) {
    query = DB.builder()
    .select()
    .from('users')
    .where('user_id = ?', session.user_id)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      res.render('profilepictureupload', {
        results: results.rows,
      });
    });
  }
});

router.post('/follower', (req, res, next) => {
  const id = req.body.followerId;
  const session = req.session;
  const query = DB.builder()
  .insert()
  .into('follower')
  .set('login_user_id', session.user_id)
  .set('follower_id', id)
  .toParam();
  DB.executeQuery(query, (error) => {
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
  .from('follower')
  .where('id = ?', id)
  .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }
    res.redirect('/profilechange');
  });
});

router.post('/profilepictureupload', upload.single('thumbnail'), (req, res, next) => {
  const session = req.session;
  let photo = '';
  if (req.file) {
    photo = req.file.filename;
  } else {
    photo = '';
  }
  const query = DB.builder()
  .update()
  .table('users')
  .set('image', photo)
  .where('user_id = ?', session.user_id)
  .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }

    res.redirect('/profilechange');
  });
});

router.post('/editprofile', (req, res, next) => {
  const session = req.session;
  const username = req.body.username;
  const email = req.body.email;
  const mobileno = req.body.mobileno;
  let password = '';
  if (req.body.confirmpassword !== '') {
    password = req.body.confirmpassword;
  } else {
    password = req.body.password;
  }
  const query = DB.builder()
  .update()
  .table('users')
  .set('username', username)
  .set('email', email)
  .set('mobilenumber', mobileno)
  .set('password', password)
  .where('user_id = ?', session.user_id)
  .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }
    res.redirect('/welcome');
  });
});

module.exports = router;
