import chai   from 'chai';
import shared from 'mocha-shared';

const expect = chai.expect;

/**
 * App integration test.
 */
describe('App', function() {
  this.timeout(1000);

  /**
   * Include shared behaviors.
   */
  before(async function() {
    await import('./App.setup.js');

    shared.setup('AppSetup');
  });

  /**
   * Start test suite.
   */
  describe('Create a request agent', function() {
    it('returns no errors', function() {
      expect(this.request).to.be.an('object');
    });;
  });
});
