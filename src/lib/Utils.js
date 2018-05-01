/**
 * Provides utility methods.
 */
export class Utils {

  /**
   * Create a new instance of Utils.
   */
  constructor() {

  }

  /**
   * Execute promised operation in sequential order.
   *
   * @memberof Utils
   * @method promiseTasks
   * @static
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
   *   let tasks = [
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
      .then(obj => obj)
      .catch(function(err) {
        throw new Error(`${name} failed due to ${err.message}`);
      });
  }
}
