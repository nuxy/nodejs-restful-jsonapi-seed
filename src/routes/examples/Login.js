'use strict';

// Local modules.
import resourceRouter from '~/middleware/ResourceRouter.js';
import loginResource  from '~/resources/examples/Login.js';
import {validate}     from '~/validators/examples/Login.js';

/**
 * @export default
 */
export default ({config, db}) => resourceRouter({

  /**
   * Enable validation.
   */
  middleware: validate,

  /**
   * Create a new session.
   *
   * POST /login
   */
  create ({body, session}, res) {
    if (loginResource(session).authenticate(body.username, body.password)) {
      res.status(200).json({
        session: {
          role: session.role
        }});
    } else {
      res.status(403).send();
    }
  }
});
