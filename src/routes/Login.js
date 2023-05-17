// Local modules.
import resourceRouter from '../middleware/ResourceRouter.js';
import loginResource  from '../resources/Login.js';
import {validate}     from '../validators/Login.js';

/**
 * @export default
 */
export default ({config, db}) => resourceRouter({

  /**
   * Enable validation.
   */
  middleware: validate,

  /**
   * @swagger
   *
   * /login:
   *   post:
   *     description: Create a new session.
   *     parameters:
   *       - name: json
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             username:
   *               type: string
   *               example: foo
   *             password:
   *               type: string
   *               example: bar
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 session:
   *                   type: object
   *                   properties:
   *                     role:
   *                       type: string
   *       403:
   *         description: Forbidden
   *       422:
   *         description: Unprocessable Entity
   *         schema:
   *            "$ref": "#/definitions/ValidationError"
   *     tags:
   *       - Login
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
