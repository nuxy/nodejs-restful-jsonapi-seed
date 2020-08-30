'use strict';

/**
 * Provides utility methods.
 */
class Utils {

  /**
   * Compare an array of REGEX to a given value.
   *
   * @param {Array} items
   *   Array to search.
   *
   * @param {String} val
   *   Search value.
   *
   * @return {Boolean|undefined}
   *
   * @example
   *   const items = [
   *     'foo',
   *     'b.*',
   *     'qux'
   *   ];
   *
   *   const result = Utils.matches(items, 'bar');
   *   // returns true
   */
  static matches(items, val) {
    for (let i = 0; i < items.length; i++) {
      const regex = new RegExp(items[i] + '$');
      if (regex.test(val)) {
        return true;
      }
    }
  }

  /**
   * Execute promised operation in sequential order.
   *
   * @param {String} name
   *   Task name.
   *
   * @param {Array} tasks
   *   Array of promised actions.
   *
   * @return {Promise}
   *
   * @example
   *   const tasks = [
   *     Promise.resolve(),
   *     Promise.resolve(),
   *     Promise.resolve(),
   *
   *     ..
   *   ];
   *
   *   Utils.promiseTasks('Operation', tasks)
   *     .then(obj => obj)
   *     .catch(function(err) {
   *
   *     });
   */
  static promiseTasks(name, tasks) {
    return tasks.reduce(function(current, next) {
      return current.then(next);
    }, Promise.resolve([]))
      .catch(function(err) {
        throw new Error(`${name} failed due to ${err.message}`);
      });
  }
}

/**
 * @export default Utils
 */
export default Utils;
