'use strict';

import chai   from 'chai';
import shared from 'mocha-shared';

/**
 * Login service integraton test.
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
});
