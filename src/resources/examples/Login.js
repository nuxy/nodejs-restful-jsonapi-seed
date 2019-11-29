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
    if (username === 'foo' && password === 'bar') {

      // Define session information.
      return (session.role = 'admin');
    }
  }
});
