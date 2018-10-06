'use strict';

import {validationResult} from 'express-validator/check';

// Local modules.
import errorHandler from '~/serializers/ErrorHandler.js';

/**
 * Middleware to handle express-validator schema results.
 *
 * @see https://github.com/ctavan/express-validator#validation-result-api
 *
 * @export default {Function}
 */
export default (req, res, next) => {

  // Exclude GET methods.
  if (req.method === 'GET') {
    return next();
  }

  // Format and send results.
  let formatter = ({location, msg, param}) => {
    return {
      detail: msg,
      source: {
        parameter: param
      }
    };
  };

  let errors = validationResult(req).formatWith(formatter);
  if (errors.isEmpty() === false) {
    return res.status(422)
      .send(errorHandler('Invalid parameter', errors.array()));
  }

  next();
};
