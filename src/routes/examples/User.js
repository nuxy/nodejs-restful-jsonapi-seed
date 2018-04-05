'use strict';

import resource from 'resource-router-middleware';

// Local modules.
import userResource from '~/resources/examples/User.js';
import serializer   from '~/serializers/examples/User.js';
import {validate}   from '~/validators/examples/User.js';

// Example data.
let users = userResource().getUsers();

/**
 * @export default
 */
export default ({config}) => resource({

  /**
   * Property name to store preloaded entity on `request`.
   */
  id: 'user',

  /**
   * Enable validation.
   */
  middleware: validate,

  /**
   * For requests with an `id`, auto-load the entity.
   */
  load (req, id, callback) {
    let user = users.find(user => user.id === id),
        err  = user ? null : {};

    callback(err, user);
  },

  /**
   * List all entities.
   *
   * GET /user
   */
  list ({params}, res) {
    res.status(200).json(serializer.get(users));
  },

  /**
   * Create a new entity.
   *
   * POST /user
   */
  create ({body}, res) {
    users.push(body);

    res.status(201).json(users);
  },

  /**
   * Return a given entity.
   *
   * GET /user/:id
   */
  read ({user}, res) {
    res.status(200).json(serializer.get(user));
  },

  /**
   * Update a given entity.
   *
   * PUT /user/:id
   */
  update ({user, body}, res) {
    if (user.id === body.id) {
      user = body;
    }

    res.status(204).json(user);
  },

  /**
   * Modify a given entity.
   *
   * PATCH /user/:id
   */
  modify ({user, body}, res) {
    for (let key in body) {
      if (key !== 'id') {
        user[key] = body[key];
      }
    }

    res.status(204).json(user);
  },

  /**
   * Delete a given entity.
   *
   * DELETE /user/:id
   */
  delete ({user}, res) {
    users.splice(users.indexOf(user), 1);

    res.status(204).json(users);
  }
});
