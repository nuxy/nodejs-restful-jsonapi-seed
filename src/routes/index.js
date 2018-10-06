'use strict';

import {Router} from 'express';

// Local modules.
import accessControlManager  from '~/middleware/AccessControlManager.js';
import contentNegotiation    from '~/middleware/ContentNegotiation.js';
import contentTypeHeader     from '~/middleware/ContentTypeHeader.js';
import sparseFieldsetsParser from '~/middleware/SparseFieldsetsParser.js';

// Examples.
import loginRouter from '~/routes/examples/Login.js';
import userRouter  from '~/routes/examples/User.js';

/**
 * @export default
 */
export default ({config, db}) => {
  let router = Router({
    caseSensitive: config.get('router.caseSensitive'),
    strict: config.get('router.strictRouting'),
  });

  // Middleware (Order is important).
  router.use(accessControlManager);
  router.use(contentNegotiation);
  router.use(contentTypeHeader);
  router.use(sparseFieldsetsParser);

  // Enable routes.
  router.use('/login', loginRouter({config, db}));
  router.use('/user',  userRouter ({config, db}));

  // Send root response.
  router.get('/', function(req, res) {
    res.status(501).json({});
  });

  return router;
};
