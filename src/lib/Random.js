import Chance from 'chance';

/**
 * Provides random data generation methods.
 *
 * @class
 */
class Random extends Chance {

  /**
   * @inheritdoc
   */
  string(length = 8, pool = 'abcdefghijklmnopqrstuvwxyz1234567890') {
    return super.string({length, pool});
  }
}

/**
 * @export default Random
 */
export default new Random();
