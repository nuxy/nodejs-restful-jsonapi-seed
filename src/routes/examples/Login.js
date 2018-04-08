'use strict';

import resource from 'resource-router-middleware';

// Local modules.
import loginResource from '~/resources/examples/Login.js';

/**
 * @export default
 */
export default ({config}) => resource({

  /**
   * Create a new session.
   *
   * POST /login
   */
  create ({body, session}, res) {
    if (loginResource(session).authenticate(body.username, body.password)) {
      res.status(200).json({});
    } else {
      res.status(403).json({});
    }
  }
});
