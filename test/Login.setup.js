import shared from 'mocha-shared';

/**
 * Shared behaviors.
 */
shared.setup('LoginSetup', function() {
  beforeEach(function(done) {

    // Create a new session.
    this.request.post('/login')
      .set('Content-Type', 'application/vnd.api+json')
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
