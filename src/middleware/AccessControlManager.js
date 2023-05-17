import {AccessControl} from 'accesscontrol';
import config          from 'config';
import deepCopy        from 'deep-copy';

// Local modules.
import utils from '../lib/Utils.js';

// Configuration.
const excludePaths  = deepCopy(config.get('router.accessControl.excludePaths'));
const grantsObject  = deepCopy(config.get('router.accessControl.grantsObject'));
const rolesByWeight = deepCopy(config.get('router.accessControl.rolesByWeight'));

/**
 * Middleware to manage access based on ABAC (Attribute-Based Access Control).
 *
 * @see https://www.npmjs.com/package/accesscontrol
 *
 * @export default {Function}
 */

// eslint-disable-next-line max-statements
export default ({method, path, session}, res, next) => {

  // Skip public routes.
  if (utils.matches(excludePaths, path)) {
    return next();
  }

  // Check grants/roles exist.
  if (!grantsObject || !rolesByWeight) {
    return next();
  }

  const ac = new AccessControl(grantsObject);

  // Grant role access.
  const user = session.role || 'anonymous';

  const userRoles = getUserRoles(rolesByWeight, user);
  const resource  = getResource(userRoles, path);

  if (resource && userRoles) {
    userRoles.shift();

    ac.grant(user).extend(userRoles);
  }

  // Check permissions.
  let permission;

  if (resource) {
    switch (method) {
      case 'POST':
        permission = ac.can(user)
          .createAny(resource);
        break;

      case 'PATCH':
      case 'PUT':
        permission = ac.can(user)
          .updateAny(resource);
        break;

      case 'DELETE':
        permission = ac.can(user)
          .deleteAny(resource);
        break;

      default:
        permission = ac.can(user)
          .readAny(resource);
    }

    if (permission.granted) {
      return next();
    }
  }

  res.status(401).json({});
  res.end();
};

/**
 * Return user roles for a given user.
 *
 * @param {Array} roles
 *   User roles (weighted).
 *
 * @param {String} user
 *   User name.
 *
 * @return {Array}
 */
function getUserRoles(roles, user) {
  return roles.slice(roles.indexOf(user));
}

/**
 * Return ABAC resource for a given path.
 *
 * @param {Array} roles
 *   User roles (weighted).
 *
 * @param {String} path
 *   Route path.
 *
 * @return {String}
 */
function getResource(roles, path) {
  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];

    // Check path for a dynamic segment.
    if (grantsObject[role][path]) {

      // None exists.
      return path;
    }

    const basePath = path.substring(
      0, path.lastIndexOf('/')
    );

    // Return the base path, if exists.
    if (grantsObject[role][basePath]) {
      return basePath;
    }
  }
}
