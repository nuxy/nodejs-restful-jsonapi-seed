'use strict';

import {Router} from 'express';

// Local modules.
import contentNegotiation    from '~/middleware/ContentNegotiation.js';
import contentTypeHeader     from '~/middleware/ContentTypeHeader.js';
import sparseFieldsetsParser from '~/middleware/SparseFieldsetsParser.js';

// Examples.
import userRouter from '~/routes/examples/User.js';

/**
 * @export default
 */
export default ({config}) => {
  let router = Router();

  // Middleware (Order is important).
  router.use(contentNegotiation);
  router.use(contentTypeHeader);
  router.use(sparseFieldsetsParser);

  // Enable routes.
  router.use('/user', userRouter({config}));

  // Send root response.
  router.get('/', function(req, res) {
    res.status(501).json({});
  });

  return router;
};
