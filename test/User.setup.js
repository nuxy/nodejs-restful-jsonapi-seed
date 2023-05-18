import shared from 'mocha-shared';

// Local modules.
import random from '../src/lib/Random.js';

/**
 * Shared behaviors.
 */
shared.setup('UserSetup', function() {
  beforeEach(function(done) {

    // Create a new user.
    this.request.post('/user')
      .set('Content-Type', 'application/vnd.api+json')
      .send({
        id:     random.guid(),
        name:   random.name(),
        age:    random.age(),
        gender: random.gender()
      })
      .end((err, res) => {
        if (res.statusCode === 201) {
          this.user = res.body.data;
        }

        done();
      });
  });
});
