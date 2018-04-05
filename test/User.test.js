'use strict';

import app      from '~/app.js';
import chai     from 'chai';
import chaiHttp from 'chai-http';
import shared   from 'mocha-shared';

chai.use(chaiHttp);

/**
 * User service integraton test.
 */
describe('User', function() {

  /**
   * Include shared behaviors.
   */
  require('./User.setup');

  /**
   * Execute before test.
   */
  shared.setup('UserSetup');

  /**
   * Start test suite.
   */
  describe('List all entities', function() {
    it('returns no errors', function(done) {
      this.timeout(1000);

      chai.request(app)
        .get('/user')
        .end(function(err, res) {
          chai.expect(res.statusCode)        .to.equal(200);
          chai.expect(res.body)              .to.have.a.property('data');
          chai.expect(res.body.data)         .to.be.an('array');
          chai.expect(res.body.data[0].type) .to.equal('users');
          done();
        });
    });
  });
});
