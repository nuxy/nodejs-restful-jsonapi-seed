import {Serializer} from 'jsonapi-serializer';

// Local modules.
import errorHandler from '../serializers/ErrorHandler.js';

/**
 * @export default {Object}
 */
export default {
  error: errorHandler,

  /**
   * GET request response.
   */
  get: function(data) {
    return (new Serializer('user', {
      attributes: [
        'name',
        'age',
        'gender'
      ],

      // @see https://www.npmjs.com/package/jsonapi-serializer#serialization
      id: 'id',

      keyForAttribute: 'dash-case',

      pluralizeType: true,

      transform: function(o) {
        //o.keyName = parseInt(o.keyName);
        return o;
      }

    })).serialize(data);
  }
};
