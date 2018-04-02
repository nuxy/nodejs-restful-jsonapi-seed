'use strict';

import {Router} from 'express';

let router = Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {title: 'Express'});
});

export default router;
