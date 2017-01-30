var request = require('supertest');
var should = require('should');
var app = require('../app');

describe('index', function (){

  describe('GET /', function() {

    it('it should response index.pug page', function(done){
    // the request-object is the supertest top level api
      request(app)
        .get('/')
        .expect('Content-type', 'text/html; charset=utf-8')
        .expect(200, done); // note that we're passing the done as parameter to the expect
      });

    });
  });
  describe('GET /register', function() {

    it('it should response register.pug page', function(done){
    // the request-object is the supertest top level api
      request(app)
        .get('/register')
        .expect('Content-type', 'text/html; charset=utf-8')
        .expect(200, done); // note that we're passing the done as parameter to the expect
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

