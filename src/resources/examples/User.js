'use strict';

/**
 * Router resource example.
 *
 * @export default {Function}
 */
export default () => ({

  /**
   * Return users from database, file, or 3rd-party service.
   *
   * @return {Array}
   */
  getUsers: function() {
    return [
      {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'Foo',
        age: 10,
        gender: 'M'
      },
      {
        id: '00000000-0000-0000-0000-000000000002',
        name: 'Bar',
        age: 20,
        gender: 'F'
      },
      {
        id: '00000000-0000-0000-0000-000000000003',
        name: 'Biz',
        age: 30,
        gender: ''
      },
      {
        id: '00000000-0000-0000-0000-000000000004',
        name: 'Baz',
        age: 40,
        gender: 'M'
      },
      {
        id: '00000000-0000-0000-0000-000000000005',
        name: 'Qux',
        age: 50,
        gender: 'F'
      }
    ];
  }
});
