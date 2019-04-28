'use strict';

import Chance from 'chance';

/**
 * Provides random data generation methods.
 *
 * @see http://chancejs.com
 *
 * @class
 */
class Random extends Chance {

  /**
   * Override string default options.
   *
   * @inheritdoc
   */
  string(options = {length: 8, pool: 'abcdefghijklmnopqrstuvwxyz1234567890'}) {
    return super.string(options);
  }
}

/**
 * @export default Random
 */
export default new Random();
