const should = require('should');
const request = require('supertest');
const server = require('../app');

describe('GET /login', () => {
  it('should return login page', (done) => {
    request(server)
    .get('/login')
    .expect('Content-type', 'text/html; charset=utf-8')
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        res.status.should.be.equal(200);
        done();
      }
    });
  });
});

describe('POST /tweet', () => {
  it('should return welcome page', (done) => {
    request(server)
    .post('/tweet')
    .expect('Content-type', 'text/plain; charset=utf-8')
    .expect(302)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        res.status.should.be.equal(302);
        done();
      }
    });
  });
});
