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
    }
  },

  id: {
    in: ['body'],
    isUUID: {
      errorMessage: 'Allowed values: UUID version 1, 3, 4, or 5'
    }
  },

  gender: {
    in: ['body'],
    isIn: {
      errorMessage: 'Allowed values: M, F, or undefined',
      options: ['M', 'F']
    }
  },

  name: {
    in: ['body'],
    isAlpha: {
      errorMessage: 'Allowed values: Alphabetic characters'
    }
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
