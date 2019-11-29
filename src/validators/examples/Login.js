'use strict';

import {checkSchema} from 'express-validator/check';

// Local modules.
import validatorResult from '~/middleware/ValidatorResult.js';

/**
 * Validator schema.
 *
 * @const {Object} schema
 */
const schema = {
  username: {
    in: ['body'],
    matches: {
      options: [/^[a-zA-Z0-9-_]+$/],
      errorMessage: 'Allowed values: Alphabetic and -_ characters'
    },
    optional: false
  },
  password: {
    in: ['body'],
    matches: {
      options: [/^[a-zA-Z0-9-_]+$/],
      errorMessage: 'Allowed values: Alphabetic and -_ characters'
    },
    optional: false
  }
};

/**
 * Exported middleware.
 *
 * @const {Array} validate
 */
const validate = [checkSchema(schema), validatorResult];

/**
 * @export {Object}
 */
export {schema, validate};
