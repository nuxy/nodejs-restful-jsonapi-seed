'use strict';

import chai   from 'chai';
import shared from 'mocha-shared';

/**
 * User service integraton test.
 */
describe('User', function() {

  /**
   * Include shared behaviors.
   */
  require('../Login.setup');
  require('./User.setup');

  /**
   * Execute before test.
   */
  shared.setup('LoginSetup');
  shared.setup('UserSetup');

  /**
   * Start test suite.
   */
  describe('List all entities', function() {
    it('returns no errors', function(done) {
      this.timeout(1000);

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

  describe('List one entity', function() {
    it('returns no errors', function(done) {
      this.timeout(1000);

      this.request.get('/user/00000000-0000-0000-0000-000000000001')
        .end(function(err, res) {
          chai.expect(res.statusCode)     .to.equal(200);
          chai.expect(res.body)           .to.have.a.property('data');
          chai.expect(res.body.data)      .to.be.an('object');
          chai.expect(res.body.data.type) .to.equal('users');
          done();
        });
    });
  });
});
