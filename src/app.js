'use strict';

import bodyParser from 'body-parser';
import config     from 'config';
import cors       from 'cors';
import express    from 'express';
import fileUpload from 'express-fileupload';
import http       from 'http';
import logger     from 'morgan';

// Local modules.
import indexRouter from '~/routes/index';

// Init Express.
let app = express();
app.server = http.createServer(app);

app.disable('x-powered-by');

app.use(bodyParser.json({
  limit: config.get('server.parser.bodyLimit'),
  type: 'application/vnd.api+json'
}));

app.use(cors({
  credentials: true,
  methods: ['DELETE', 'GET', 'PATCH', 'POST', 'PUT'],
  optionsSuccessStatus: 200
}));

app.use(fileUpload({
  limits: {
    abortOnLimit:  config.get('server.uploads.abortOnLimit'),
    fileSize:      config.get('server.uploads.fileLimit'),
    safeFileNames: config.get('server.uploads.safeFileNames')
  }
}));

// Enable logging.
switch (process.env.NODE_ENV) {
  case 'test':
    break;

  default:
    app.use(logger('dev'));
}

// Enable routes.
app.use(config.get('router.prefix'), indexRouter({config}));

if (process.env.NODE_ENV === undefined) {
  app.use('/doc', express.static('doc'));
}

// Launch server.
app.server.listen(config.get('server.port'), () => {
  console.log(`Listening on port ${app.server.address().port}`);
});

// Handle errors.
app.server.on('error', err => {
  switch (err.code) {
    case 'EACCES':
      console.error('Port requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error('Port is already in use');
      process.exit(1);
      break;

    default:
      throw err;
  }
});

/**
 * @export default {Express}
 */
export default app;
