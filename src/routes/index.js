'use strict';

import {Router} from 'express';

/**
 * @export default
 */
export default ({config}) => {
  let router = Router();

  router.get('/', function(req, res) {
    res.render('index', {title: 'Express'});
  });

  return router;
};
