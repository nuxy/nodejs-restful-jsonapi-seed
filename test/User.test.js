import chai   from 'chai';
import shared from 'mocha-shared';

// Local modules.
import random from '~/lib/Random.js';

/**
 * User service integration test.
 */
describe('User', function() {
  this.timeout(1000);

  /**
   * Include shared behaviors.
   */
  import('./Login.setup');
  import('./User.setup');

  /**
   * Execute before test.
   */
  shared.setup('LoginSetup');
  shared.setup('UserSetup');

  /**
   * Start test suite.
   */
  describe('Create a new user', function() {
    it('returns no errors', function(done) {
      chai.expect(this.user) .to.be.an('object');
      done();
    });
  });

  describe('List all users', function() {
    it('returns no errors', function(done) {
      this.request.get('/user')
        .end(function(err, res) {
          chai.expect(res.statusCode)        .to.equal(200);
          chai.expect(res.body)              .to.have.a.property('data');
          chai.expect(res.body.data)         .to.be.an('array');
          chai.expect(res.body.data[0].type) .to.equal('users');
          done();
        });
    });
  });

  describe('List one user', function() {
    it('returns no errors', function(done) {
      this.request.get(`/user/${this.user.id}`)
        .end(function(err, res) {
          chai.expect(res.statusCode)     .to.equal(200);
          chai.expect(res.body)           .to.have.a.property('data');
          chai.expect(res.body.data)      .to.be.an('object');
          chai.expect(res.body.data.type) .to.equal('users');
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
          chai.expect(res.statusCode) .to.equal(204);
          done();
        });
    });
  });

  describe('Delete a user', function() {
    it('returns no errors', function(done) {
      this.request.delete(`/user/${this.user.id}`)
        .set('Content-Type', 'application/vnd.api+json')
        .end(function(err, res) {
          chai.expect(res.statusCode) .to.equal(204);
          done();
        });
    });
  });
});
