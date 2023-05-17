/**
 * Example of a database handle wrapper.
 *
 * @see https://www.npmjs.com/package/mongodb#connect-to-mongodb
 * @see https://www.npmjs.com/package/mysql#establishing-connections
 *
 * @export default {Function}
 */
export default callback => {
  const dbh = {};

  // Connect to your database, return the active handle.
  callback(dbh);
};
