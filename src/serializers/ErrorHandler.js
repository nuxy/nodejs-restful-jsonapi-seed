'use strict';

import Error from 'jsonapi-serializer';

/**
 * @export default {Function}
 */
export default (title, options) => {
  return new Error(
    options.map(o => {
      o.title = title;
      return o;
    })
  );
};
