const should = require('should');
const request = require('supertest');
const app = require('../app');

// describe('index', () => {
//   describe('GET /', () => {
//     it('it should response index.pug page', (done) => {
//       request(app)
//         .get('/')
//         .expect('Content-type', 'text/html; charset=utf-8')
//         .expect(200, done);
//     });
//   });
// });
// describe('GET /register', () => {
//   it('it should response register.pug page', (done) => {
//     request(app)
//     .get('/register')
//     .expect('Content-type', 'text/html; charset=utf-8')
//     .expect(200, done);
//   });
// });
// describe('GET /login', () => {
//   it('should return login page', (done) => {
//     request(app)
//     .get('/login')
//     .expect('Content-type', 'text/html; charset=utf-8')
//     .expect(200)
//     .end((err, res) => {
//       if (err) {
//         done(err);
//       } else {
//         res.status.should.be.equal(200);
//         done();
//       }
//     });
//   });
// });

// describe('POST/register', () => {
//   it('it should response login.pug page', (done) => {
//     const register = {
//       user_id: '1',
//       username: 'parita',
//       mobilenumber: '1234567890',
//       email: 'parita@improwised.com',
//       password: 'parita',
//     };
//     request(app)
//     .post('/register')
//     .send(register)
//     .expect(200)
//     .end((err, res) => {
//       if (err) {
//         done(err);
//       } else {
//         res.status.should.be.equal(200);
//         done();
//       }
//     });
//   });
// });

// describe('POST/login', () => {
//   it('it should response welcome.pug page', (done) => {
//     const users = {
//       username: 'parita',
//       password: 'parita',
//     };
//     request(app)
//     .post('/login')
//     .send(users)
//     .expect(302)
//     .end((err, res) => {
//       if (err) {
//         done(err);
//       } else {
//         res.status.should.be.equal(302);
//         done();
//       }
//     });
//   });
// });

// describe('GET/logout', () => {
//   it('it should response login.pug page', (done) => {
//     request(app)
//     .get('/logout')
//     .expect('Content-type', 'text/plain; charset=utf-8')
//     .expect(302, done); // note that we're passing the done as parameter to the expect
//   });
// });

// describe('GET/welcome', () => {
//   it('it should response welcome.pug page', (done) => {
//     this.timeout(500);
//     setTimeout(done, 300);
//     request(app)
//     .get('/welcome')
//     .expect('Content-type', 'text/html; charset=utf-8')
//     .expect(200, done);
//   });
// });

// describe('GET /profilepictureupdate', () => {
//   it('it should response login.pug page', (done) => {
//     this.timeout(500);
//     setTimeout(done, 300);
//     request(app)
//     .get('/profilepictureupload')
//     .expect('Content-type', 'text/html; charset=utf-8')
//     .expect(200, done); // note that we're passing the done as parameter to the expect
//   });
// });

// describe('GET /profilechange', () => {
//   it('it should response login.pug page', (done) => {
//     this.timeout(500);
//     setTimeout(done, 300);
//     request(app)
//     .get('/profilechange')
//     .expect('Content-type', 'text/html; charset=utf-8')
//     .expect(200, done); // note that we're passing the done as parameter to the expect
//   });
// });

// describe('POST/tweet', () => {
//   it('it should response welcome.pug page', (done) => {
//     const users = {
//       userid: '1',
//       tweet: 'parita',
//     };
//     request(app)
//     .post('/tweet')
//     .send(users)
//     .expect(302)
//     .end((err, res) => {
//       if (err) {
//         done(err);
//       } else {
//         res.status.should.be.equal(302);
//         done();
//       }
//     });
//   });
// });
// describe('POST/follower', () => {
//   it('it should response welcome.pug page', (done) => {
//     const users = {
//       login_user_id: '1',
//       follower_id: 'parita',
//     };
//     request(app)
//     .post('/follower')
//     .send(users)
//     .expect(302)
//     .end((err, res) => {
//       if (err) {
//         done(err);
//       } else {
//         res.status.should.be.equal(302);
//         done();
//       }
//     });
//   });
// });
// describe('POST/unfollow', () => {
//   it('it should response profilechange.pug page', (done) => {
//     const users = {
//       id: '1',
//     };
//     request(app)
//     .post('/unfollow')
//     .send(users)
//     .expect(302)
//     .end((err, res) => {
//       if (err) {
//         done(err);
//       } else {
//         res.status.should.be.equal(302);
//         done();
//       }
//     });
//   });
// });
// describe('POST/profilepictureupload', () => {
//   it('it should response profilechange.pug page', (done) => {
//     const users = {
//       thumbnail: '../public/images/1.jpeg',
//       user_id: '1',
//     };
//     request(app)
//     .post('/profilepictureupload')
//     .send(users)
//     .expect(302)
//     .end((err, res) => {
//       if (err) {
//         done(err);
//       } else {
//         res.status.should.be.equal(302);
//         done();
//       }
//     });
//   });
// });
// describe('POST/editprofile', () => {
//   it('it should response profilechangep.pug page', (done) => {
//     const users = {
//       login_user_id: '1',
//       follower_id: 'parita',
//     };
//     request(app)
//       .post('/editprofile')
//       .send(users)
//       .expect(200)
//       .end((err, res) => {
//         if (err) {
//           done(err);
//         } else {
//           res.status.should.be.equal(200);
//           done();
//         }
//       });
//   });
// });
