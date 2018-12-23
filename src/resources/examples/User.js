'use strict';

// Local modules.
import random from '~/lib/Random.js';

/**
 * Router resource example.
 *
 * @export default {Function}
 */
export default (session) => ({

  /**
   * Create a new user.
   *
   * @param {Object} props
   *   User properties.
   */
  createUser: function(props) {
    this.initDatabase();

    let user = {
      id:     props.id || random.guid(),
      name:   props.name,
      age:    props.age,
      gender: props.gender
    };

    session.user.push(user);

    return user;
  },

  /**
   * Delete a user by ID.
   *
   * @param {String} id
   *   User identifier.
   */
  deleteUser: function(id) {
    let index = this.getUsers().indexOf(this.getUser(id));

    session.user.splice(index, 1);
  },

  /**
   * Return an array of users.
   *
   * @return {Array}
   */
  getUsers: function() {
    this.initDatabase();

    return session.user;
  },

  /**
   * Return a user by ID.
   *
   * @param {String} id
   *   User identifier.
   *
   * @return {Object}
   */
  getUser: function(id) {
    return this.getUsers().find(user => user.id === id);
  },

  /**
   * Update a user by ID.
   *
   * @param {String} id
   *   User identifier.
   *
   * @param {Object} props
   *   User properties.
   */
  updateUser: function(id, props) {
    let index = this.getUsers().indexOf(this.getUser(id));

    for (let key in props) {
      if (session.user[index].hasOwnProperty(key)) {
        session.user[index][key] = props[key];
      }
    }
  },

  /**
   * Populate the session store with dummy data.
   */
  initDatabase: function() {
    if (!session.user) {
      session.user = [
        {
          id: '00000000-0000-0000-0000-000000000001',
          name: 'Foo Bar',
          age: 10,
          gender: 'Male'
        },
        {
          id: '00000000-0000-0000-0000-000000000002',
          name: 'Biz Baz',
          age: 20,
          gender: 'Female'
        },
        {
          id: '00000000-0000-0000-0000-000000000003',
          name: 'Qui Qux',
          age: 30,
          gender: 'Binary'
        }
      ];
    }
  }
});
