import chai   from 'chai';
import shared from 'mocha-shared';

const expect = chai.expect;

// Local modules.
import random from '../src/lib/Random.js';

/**
 * User service integration test.
 */
describe('User', function() {
  this.timeout(1000);

  /**
   * Include shared behaviors.
   */
  before(async function() {
    await import('./App.setup.js');
    await import('./Login.setup.js');
    await import('./User.setup.js');

    shared.setup('AppSetup');
    shared.setup('LoginSetup');
    shared.setup('UserSetup');
  });

  /**
   * Start test suite.
   */
  describe('Create a new user', function() {
    it('returns no errors', function() {
      expect(this.user).to.be.an('object');
    });
  });

  describe('List all users', function() {
    it('returns no errors', function(done) {
      this.request.get('/user')
        .end(function(err, res) {
          expect(res.statusCode)        .to.equal(200);
          expect(res.body)              .to.have.a.property('data');
          expect(res.body.data)         .to.be.an('array');
          expect(res.body.data[0].type) .to.equal('users');
          done();
        });
    });
  });

  describe('List one user', function() {
    it('returns no errors', function(done) {
      this.request.get(`/user/${this.user.id}`)
        .end(function(err, res) {
          expect(res.statusCode)     .to.equal(200);
          expect(res.body)           .to.have.a.property('data');
          expect(res.body.data)      .to.be.an('object');
          expect(res.body.data.type) .to.equal('users');
          done();
        });
    });
  });

  describe('Update a user', function() {
    it('returns no errors', function(done) {
      this.request.patch(`/user/${this.user.id}`)
        .set('Content-Type', 'application/vnd.api+json')
        .send({
          name:   random.name(),
          age:    random.age(),
          gender: random.gender()
        })
        .end(function(err, res) {
          expect(res.statusCode) .to.equal(204);
          done();
        });
    });
  });

  describe('Delete a user', function() {
    it('returns no errors', function(done) {
      this.request.delete(`/user/${this.user.id}`)
        .set('Content-Type', 'application/vnd.api+json')
        .end(function(err, res) {
          expect(res.statusCode) .to.equal(204);
          done();
        });
    });
  });
});
