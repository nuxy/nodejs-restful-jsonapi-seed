'use strict';

/**
 * Middleware to send JSON API supported Content-Type header.
 *
 * @see http://jsonapi.org/format/#content-negotiation-servers
 *
 * @export default {Function}
 */
export default (req, res, next) => {
  res.set('Content-Type', 'application/vnd.api+json');
  next();
};
