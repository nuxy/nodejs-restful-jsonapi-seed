'use strict';

import config from 'config';

/**
 * Middleware to rewrite, or omit, the X-Powered-By header.
 *
 * @export default {Function}
 */
export default (req, res, next) => {
  let xPoweredBy = config.get('server.xPoweredBy');
  if (xPoweredBy) {
    res.setHeader('X-Powered-By', xPoweredBy);
  } else {
    res.removeHeader('X-Powered-By');
  }

  next();
};
