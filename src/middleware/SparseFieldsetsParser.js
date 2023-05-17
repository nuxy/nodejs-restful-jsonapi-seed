import QueryParser from 'jsonapi-query-parser';

/**
 * Middleware to parse JSON API sparse fieldsets.
 *
 * @see http://jsonapi.org/format/#fetching-sparse-fieldsets
 *
 * @export default {Function}
 */
export default (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
    req.query = (new QueryParser()).parseRequest(req.url);
  }
  next();
};
