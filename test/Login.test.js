import chai   from 'chai';
import shared from 'mocha-shared';

const expect = chai.expect;

/**
 * Login service integration test.
 */
describe('Login', function() {
  this.timeout(1000);

  /**
   * Include shared behaviors.
   */
  before(async function() {
    await import('./App.setup.js');
    await import('./Login.setup.js');

    shared.setup('AppSetup');
    shared.setup('LoginSetup');
  });

  /**
   * Start test suite.
   */
  describe('Create a new session', function() {
    it('returns no errors', function() {
      console.log('SESSION', this.session);

      expect(this.session).to.be.true;
    });;
  });
});
