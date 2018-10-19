'use strict';

import chai   from 'chai';
import shared from 'mocha-shared';

/**
 * Login service integration test.
 */
describe('Login', function() {

  /**
   * Include shared behaviors.
   */
  require('./Login.setup');

  /**
   * Execute before test.
   */
  shared.setup('LoginSetup');

  /**
   * Start test suite.
   */
  describe('Create a new session', function() {
    it('returns no errors', function(done) {
      chai.expect(this.session) .to.be.true;
      done();
    });
  });

  describe('Check session exists', function() {
    it('returns no errors', function(done) {
      this.timeout(1000);

      this.request.get('/login')
        .end(function(err, res) {
          chai.expect(res.statusCode) .to.equal(200);
          chai.expect(res.body)       .to.have.a.property('session');
          done();
        });
    });
  });
});
