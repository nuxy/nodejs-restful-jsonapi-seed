'use strict';

import {checkSchema} from 'express-validator';

// Local modules.
import validatorResult from '../middleware/ValidatorResult.js';

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

    // When excludePaths is defined restrict request method
    // for the given parameter.  This is overridden when
    // defined in the ABAC grantsObject
    //
    //custom: {
    //  options: (value, {req}) => {
    //    if (req.method.match(/PATCH|POST|PUT/)) {
    //      return value;
    //    }
    //
    //    return Promise.resolve();
    //  }
    //},

    optional: true
  },

  id: {
    in: ['body', 'params'],
    isUUID: {
      errorMessage: 'Allowed values: UUID version 1, 3, 4, or 5'
    },
    optional: true
  },

  gender: {
    in: ['body'],
    isIn: {
      errorMessage: 'Allowed values: M, F, or undefined',
      options: [['Male', 'Female', 'Binary']]
    },
    optional: true
  },

  name: {
    in: ['body'],
    matches: {
      options: [/^[a-zA-Z\s]+$/],
      errorMessage: 'Allowed values: Alphabet and space characters'
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
