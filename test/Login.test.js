import chai   from 'chai';
import shared from 'mocha-shared';

/**
 * Login service integration test.
 */
describe('Login', function() {
  this.timeout(1000);

  /**
   * Include shared behaviors.
   */
  import('./Login.setup');

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
    });;
  });
});
