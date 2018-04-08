'use strict';

/**
 * Router resource example.
 *
 * @export default {Function}
 */
export default (session) => ({

  /**
   * Authenticate user from database, file, or 3rd-party service.
   *
   * @return {Boolean}
   */
  authenticate: function(username, password) {

    // Define session information.
    session.role = 'admin';

    return true;
  }
});
