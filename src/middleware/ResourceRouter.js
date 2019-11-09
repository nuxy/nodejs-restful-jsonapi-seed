'use strict';

import {Router} from 'express';

/**
 * Middleware to handle resource routing responsibilities.
 *
 * Ported from 'resource-router-middleware' to support ID-less routing.
 *
 * @see https://github.com/developit/resource-router-middleware/pull/18
 *
 * Copyright (c) 2015, Jason Miller
 *
 * https://opensource.org/licenses/BSD-3-Clause
 */
const keyed = [
  'get',
  'read',
  'put',
  'update',
  'patch',
  'modify',
  'del',
  'delete'
];

const ResourceRouter = (route) => {
  route.mergeParams = !!route.mergeParams;

  const router = Router({
    mergeParams: route.mergeParams
  });

  if (route.middleware) {
    router.use(route.middleware);
  }

  if (route.load) {
    router.param(route.id, (req, res, next, id) => {
      route.load(req, id, (err, data) => {
        if (err) {
          return res.status(404).send(err);
        }

        req[route.id] = data;
        next();
      });
    });
  }

  const map = {
    index:'get',
    list:'get',
    read:'get',
    create:'post',
    update:'put',
    modify:'patch'
  };

  for (let key in route) {
    if (route.hasOwnProperty(key)) {
      const fn = map[key] || key;

      if (typeof router[fn] === 'function') {
        const url = ~keyed.indexOf(key) && route.id ? ('/:' + route.id) : '/';
        router[fn](url, route[key]);
      }
    }
  }

  return router;
};

ResourceRouter.keyed = keyed;

/**
 * @export default {Function}
 */
export default ResourceRouter;
