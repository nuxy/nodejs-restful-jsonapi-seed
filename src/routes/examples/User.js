'use strict';

import resource from 'resource-router-middleware';

// Local modules.
import userResource from '~/resources/examples/User.js';
import serializer   from '~/serializers/examples/User.js';
import {validate}   from '~/validators/examples/User.js';

/**
 * @export default
 */
export default ({config, db}) => resource({

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
   * List all users.
   *
   * GET /user
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
   * Create a new user.
   *
   * POST /user
   */
  create ({body, session}, res) {
    const user = userResource(session).createUser(body);

    res.status(201).json(serializer.get(user));
  },

  /**
   * Return a given user.
   *
   * GET /user/:id
   */
  read ({user}, res) {
    res.status(200).json(serializer.get(user));
  },

  /**
   * Update a given user.
   *
   * PUT /user/:id
   */
  update ({user, body, session}, res) {
    userResource(session).updateUser(user.id, body);

    res.status(204).send();
  },

  /**
   * Modify a given user.
   *
   * PATCH /user/:id
   */
  modify ({user, body, session}, res) {
    userResource(session).updateUser(user.id, body);

    res.status(204).send();
  },

  /**
   * Delete a given user.
   *
   * DELETE /user/:id
   */
  delete ({user, session}, res) {
    userResource(session).deleteUser(user.id);

    res.status(204).send();
  }
});
