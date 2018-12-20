'use strict';

import app      from '~/app.js';
import chai     from 'chai';
import chaiHttp from 'chai-http';
import shared   from 'mocha-shared';

chai.use(chaiHttp);

/**
 * Shared behaviors.
 */
shared.setup('LoginSetup', function() {
  beforeEach(function(done) {

    // Create shared request agent.
    this.request = chai.request.agent(app);

    // Create a new session.
    this.request.post('/login')
      .send({
        username: 'foo',
        password: 'bar'
      })
      .end((err, res) => {
        if (res.statusCode === 200) {
          this.session = true;
        }
        done();
      });
  });
});
