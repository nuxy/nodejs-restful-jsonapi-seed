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
  age: {
    in: ['body'],
    isNumeric: {
      errorMessage: 'Allowed values: Numeric characters'
    },
    custom: {
      options: (value, {req}) => {

        // Supported methods.
        if (req.method.match(/PATCH|POST|PUT/)) {
          return value;
        }

        return Promise.resolve();
      }
    },
    optional: true
  },

  id: {
    in: ['body', 'params'],
    isUUID: {
      errorMessage: 'Allowed values: UUID version 1, 3, 4, or 5'
    },
    custom: {
      options: (value, {req}) => {

        // Supported methods.
        if (req.method.match(/DELETE|GET|PATCH|PUT/)) {
          return value;
        }

        return Promise.resolve();
      }
    },
    optional: true
  },

  gender: {
    in: ['body'],
    isIn: {
      errorMessage: 'Allowed values: M, F, or undefined',
      options: [['Male', 'Female', 'Binary']]
    },
    custom: {
      options: (value, {req}) => {

        // Supported methods.
        if (req.method.match(/PATCH|POST|PUT/)) {
          return value;
        }

        return Promise.resolve();
      }
    },
    optional: true
  },

  name: {
    in: ['body'],
    matches: {
      options: [/^[a-zA-Z\s]+$/],
      errorMessage: 'Allowed values: Alphabet and space characters'
    },
    custom: {
      options: (value, {req}) => {

        // Supported methods.
        if (req.method.match(/PATCH|POST|PUT/)) {
          return value;
        }

        return Promise.resolve();
      }
    },
    optional: true
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
