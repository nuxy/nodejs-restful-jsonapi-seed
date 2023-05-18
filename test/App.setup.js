import app      from '../src/app.js';
import chai     from 'chai';
import chaiHttp from 'chai-http';
import shared   from 'mocha-shared';

chai.use(chaiHttp);

/**
 * Shared behaviors.
 */
shared.setup('AppSetup', function() {
  beforeEach(function() {

    // Create shared request agent.
    this.request = chai.request.agent(app);
  });
});
