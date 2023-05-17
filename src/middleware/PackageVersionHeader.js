/**
 * Middleware to send the package.json version as header.
 *
 * Only accessible in non-Production environments.
 *
 * @export default {Function}
 */
export default (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    res.setHeader('X-Version', process.env.npm_package_version);
  }

  next();
};
