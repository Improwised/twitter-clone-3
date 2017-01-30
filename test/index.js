var request = require('supertest');
var should = require('should');
var app = require('../app');

describe('index', function (){

  describe('GET /', function() {

    it('it should response index.pug page', function(done){
      request(app)
        .get('/')
        .expect('Content-type', 'text/html; charset=utf-8')
        .expect(200, done);
      });
    });
  });
  describe('GET /register', function() {

    it('it should response register.pug page', function(done){
      request(app)
      .get('/register')
      .expect('Content-type', 'text/html; charset=utf-8')
      .expect(200, done);
    });
  });
  describe('GET /login', () => {
  it('should return login page', (done) => {
    request(server)
    .get('/login')
    .expect('Content-type', 'text/html; charset=utf-8')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        done(err);
      } else {
        res.status.should.be.equal(200);
        done();
      }
    });
  });
});


  describe('POST/register', function() {
    it('it should response login.pug page', function(done){
    var register = {
      user_id: '1',
      username: 'parita',
      mobilenumber: '1234567890',
      email: 'parita@improwised.com',
      password: 'parita',
    };
    request(app)
      .post('/register')
      .send(register)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(200);
          done();
        }
      });
    });
  });

  describe('POST/login', function() {
    it('it should response welcome.pug page', function(done){
    var users = {
      username: 'parita',
      password: 'parita',
    };
    request(app)
      .post('/login')
      .send(users)
      .expect(302)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
    });
  });

  describe('GET/logout', function() {
    it('it should response login.pug page', function(done){
      request(app)
      .get('/logout')
      .expect('Content-type', 'text/plain; charset=utf-8')
      .expect(302, done); // note that we're passing the done as parameter to the expect
    });
  });

  describe('GET/welcome', function(){
    it('it should response welcome.pug page', function(done){
      this.timeout(500);
      setTimeout(done, 300);
      request(app)
      .get('/welcome')
      .expect('Content-type', 'text/html; charset=utf-8')
      .expect(200, done);
    });
  });

  describe('GET /profilepictureupdate', function() {
    it('it should response login.pug page', function(done){
      this.timeout(500);
      setTimeout(done, 300);
      request(app)
      .get('/profilepictureupload')
      .expect('Content-type', 'text/html; charset=utf-8')
      .expect(200, done); // note that we're passing the done as parameter to the expect
    });
  });

  describe('GET /profilechange', function() {
    it('it should response login.pug page', function(done){
      this.timeout(500);
      setTimeout(done, 300);
      request(app)
      .get('/profilechange')
      .expect('Content-type', 'text/html; charset=utf-8')
      .expect(200, done); // note that we're passing the done as parameter to the expect
    });
  });

  describe('POST/tweet', function() {
    it('it should response welcome.pug page', function(done){
    var users = {
      userid: '1',
      tweet: 'parita',
    };
    request(app)
      .post('/tweet')
      .send(users)
      .expect(302)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
    });
  });
  describe('POST/follower', function() {
    it('it should response welcome.pug page', function(done){
    var users = {
      login_user_id: '1',
      follower_id: 'parita',
    };
    request(app)
      .post('/follower')
      .send(users)
      .expect(302)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
    });
  });
  describe('POST/unfollow', function() {
    it('it should response profilechange.pug page', function(done){
    var users = {
      id: '1',
    };
    request(app)
      .post('/unfollow')
      .send(users)
      .expect(302)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
    });
  });
  describe('POST/profilepictureupload', function() {
    it('it should response profilechange.pug page', function(done){
    var users = {
      thumbnail: '../public/images/1.jpeg',
      user_id: '1',
    };
    request(app)
      .post('/profilepictureupload')
      .send(users)
      .expect(302)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
    });
  });
  describe('POST/editprofile', function() {
    it('it should response profilechangep.pug page', function(done){
    var users = {
      login_user_id: '1',
      follower_id: 'parita',
    };
    request(app)
      .post('/editprofile')
      .send(users)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(200);
          done();
        }
      });
    });
  });
