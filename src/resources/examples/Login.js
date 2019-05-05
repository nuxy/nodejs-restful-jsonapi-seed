'use strict';

/**
 * Router resource example.
 *
 * @export default {Function}
 */
export default (session) => ({

  /**
   * Authenticate user from database, file, or 3rd-party service.
   */
  authenticate: function(username, password) {

    // Define session information.
    if (username && password) {
      return session.role = 'admin';
    }
  }
});
