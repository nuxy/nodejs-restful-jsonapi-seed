'use strict';

/**
 * Middleware to handle JSON API content negotiation responsibilities.
 *
 * @see http://jsonapi.org/format/#content-negotiation-clients
 * @see http://jsonapi.org/format/#content-negotiation-servers
 *
 * @export default {Function}
 */
export default (req, res, next) => {

  // Exclude GET requests.
  if (req.method !== 'GET') {
    return next();
  }

  // Check client request headers.
  if (/application\/vnd\.api\+json;*./.test(req.header('Accept'))) {
    res.sendStatus(406);
    res.end();
  } else if (req.is('application/vnd.api+json') === false) {
    res.sendStatus(415);
    res.end();
  } else {
    next();
  }
};
