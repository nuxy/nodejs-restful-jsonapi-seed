'use strict';

// Local modules.
import resourceRouter from '~/middleware/ResourceRouter.js';
import userResource   from '~/resources/User.js';
import serializer     from '~/serializers/User.js';
import {validate}     from '~/validators/User.js';

/**
 * @export default
 */
export default ({config, db}) => resourceRouter({

  /**
   * Property name to store preloaded user on `request`.
   */
  id: 'user',

  /**
   * Enable validation.
   */
  middleware: validate,

  /**
   * For requests with an `id`, auto-load the user.
   */
  load ({session}, id, callback) {
    const user = userResource(session).getUser(id);
    const err  = user ? null : {};

    callback(err, user);
  },

  /**
   * @swagger
   *
   * /user:
   *   get:
   *     description: List all users.
   *     responses:
   *       200:
   *         description: Returns JSON response.
   *         content:
   *           application/json:
   *             schema:
   *               "$ref": "#/definitions/UserGetAll"
   *     security:
   *       - cookieAuth: []
   *     tags:
   *       - User
   */
  list ({params, session}, res) {
    const users = userResource(session).getUsers();
    if (users) {
      res.status(200).json(serializer.get(users));
    } else {
      res.status(204).send();
    }
  },

  /**
   * @swagger
   *
   * /user:
   *   post:
   *     description: Create new user.
   *     parameters:
   *       - name: json
   *         in: body
   *         schema:
   *           "$ref": "#/definitions/UserPost"
   *     responses:
   *       201:
   *         description: Returns JSON response.
   *         content:
   *           application/json:
   *             schema:
   *               "$ref": "#/definitions/UserGetOne"
   *       401:
   *         description: Unauthorized
   *       422:
   *         description: Unprocessable Entity
   *         schema:
   *            "$ref": "#/definitions/ValidationError"
   *     security:
   *       - cookieAuth: []
   *     tags:
   *       - User
   */
  create ({body, session}, res) {
    const user = userResource(session).createUser(body);

    res.status(201).json(serializer.get(user));
  },

  /**
   * @swagger
   *
   * /user/00000000-0000-0000-0000-000000000001:
   *   get:
   *     description: List one user.
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               "$ref": "#/definitions/UserGetOne"
   *       401:
   *         description: Unauthorized
   *       422:
   *         description: Unprocessable Entity
   *         schema:
   *            "$ref": "#/definitions/ValidationError"
   *     security:
   *       - cookieAuth: []
   *     tags:
   *       - User
   */
  read ({user}, res) {
    res.status(200).json(serializer.get(user));
  },

  /**
   * @swagger
   *
   * /user/00000000-0000-0000-0000-000000000001:
   *   put:
   *     description: Update a given user (resource).
   *     parameters:
   *       - name: json
   *         in: body
   *         schema:
   *           "$ref": "#/definitions/UserPut"
   *     responses:
   *       204:
   *         description: Success
   *       401:
   *         description: Unauthorized
   *       422:
   *         description: Unprocessable Entity
   *         schema:
   *            "$ref": "#/definitions/ValidationError"
   *     security:
   *       - cookieAuth: []
   *     tags:
   *       - User
   */
  update ({user, body, session}, res) {
    userResource(session).updateUser(user.id, body);

    res.status(204).send();
  },

  /**
   * @swagger
   *
   * /user/00000000-0000-0000-0000-000000000001:
   *   patch:
   *     description: Modify a given user (property).
   *     parameters:
   *       - name: json
   *         in: body
   *         schema:
   *           "$ref": "#/definitions/UserPatch"
   *     responses:
   *       204:
   *         description: Success
   *       401:
   *         description: Unauthorized
   *       422:
   *         description: Unprocessable Entity
   *         schema:
   *            "$ref": "#/definitions/ValidationError"
   *     security:
   *       - cookieAuth: []
   *     tags:
   *       - User
   */
  modify ({user, body, session}, res) {
    userResource(session).updateUser(user.id, body);

    res.status(204).send();
  },

  /**
   * @swagger
   *
   * /user/00000000-0000-0000-0000-000000000001:
   *   delete:
   *     description: Delete a given user.
   *     responses:
   *       204:
   *         description: Success
   *       401:
   *         description: Unauthorized
   *       422:
   *         description: Unprocessable Entity
   *         schema:
   *            "$ref": "#/definitions/ValidationError"
   *     security:
   *       - cookieAuth: []
   *     tags:
   *       - User
   */
  delete ({user, session}, res) {
    userResource(session).deleteUser(user.id);

    res.status(204).send();
  }

  /**
   * @swagger
   *
   * definitions:
   *   UserGetAll:
   *     type: object
   *     properties:
   *       data:
   *         type: array
   *         items:
   *           type: object
   *           properties:
   *             type:
   *               type: string
   *             id:
   *               type: string
   *             attributes:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *                 age:
   *                   type: string
   *                 gender:
   *                   type: string
   *   UserGetOne:
   *     type: object
   *     properties:
   *       data:
   *         type: object
   *         properties:
   *           type:
   *             type: string
   *           id:
   *             type: string
   *           attributes:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               age:
   *                 type: string
   *               gender:
   *                 type: string
   *   UserPatch:
   *     type: object
   *     properties:
   *       name:
   *         type: string
   *         example: foo bar
   *       age:
   *         type: number
   *         example: 45
   *       gender:
   *         type: string
   *         example: Binary
   *   UserPut:
   *     type: object
   *     properties:
   *       name:
   *         type: string
   *         example: biz baz
   *   UserPost:
   *     type: object
   *     properties:
   *       name:
   *         type: string
   *         example: foo bar
   *       age:
   *         type: number
   *         example: 45
   *       gender:
   *         type: string
   *         example: Binary
   */
});
