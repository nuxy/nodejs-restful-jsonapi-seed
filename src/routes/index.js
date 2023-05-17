'use strict';

import {Router} from 'express';
import Glob     from 'glob';
import path     from 'path';

// Local modules.
import accessControlManager  from '../middleware/AccessControlManager.js';
import contentNegotiation    from '../middleware/ContentNegotiation.js';
import contentTypeHeader     from '../middleware/ContentTypeHeader.js';
import packageVersionHeader  from '../middleware/PackageVersionHeader.js';
import poweredByHeader       from '../middleware/PoweredByHeader.js';
import sparseFieldsetsParser from '../middleware/SparseFieldsetsParser.js';

/**
 * @export default
 */
export default ({config, db}) => {
  const router = Router({
    caseSensitive: config.get('router.caseSensitive'),
    strict:        config.get('router.strictRouting'),
  });

  // Middleware (Order is important).
  router.use(packageVersionHeader);
  router.use(poweredByHeader);
  router.use(accessControlManager);
  router.use(contentNegotiation);
  router.use(contentTypeHeader);
  router.use(sparseFieldsetsParser);

  const app = {config, db};

  // Enable configured routes.
  const baseDir = './src/routes';

  new Glob('**/*.js', {cwd: baseDir, ignore: '**/index.js'}, (err, files) => {
    if (err) {
      throw new Error(`Routing config: ${err.message}`);
    }

    files.forEach(function(file) {
      const name = path.parse(file).name;

      import(`./${name}\.js`)
        .then(function(func) {
          const route = func.default(app);

          router.use(`/${name}`, route);
        });
    });
  });

  // Send root response.
  router.get('/', function(req, res) {
    res.status(501).json({});
  });

  return router;
};
