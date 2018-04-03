'use strict';

import {Router} from 'express';

/**
 * @export default
 */
export default ({config}) => {
  let router = Router();

  // Send root response.
  router.get('/', function(req, res) {
    res.status(501).json({});
  });

  return router;
};
