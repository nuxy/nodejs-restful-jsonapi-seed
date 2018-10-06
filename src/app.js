'use strict';

import bodyParser from 'body-parser';
import config     from 'config';
import cors       from 'cors';
import express    from 'express';
import fileUpload from 'express-fileupload';
import session    from 'express-session';
import http       from 'http';
import logger     from 'morgan';
import uuid       from 'uuid/v4';

// Local modules.
import Database     from '~/lib/Database.js';
import SessionStore from '~/lib/SessionStore.js';
import indexRouter  from '~/routes/index.js';

// Swagger examples.
import swaggerUi   from 'swagger-ui-express';
import swaggerJson from '~/../swagger.json';

// Init Express.
let app = express();
app.server = http.createServer(app);

app.disable('x-powered-by');

app.use(bodyParser.json({
  limit: config.get('server.parser.bodyLimit'),
  type: 'application/vnd.api+json'
}));

app.use(cors({
  credentials: config.get('cors.credentials'),
  methods:     config.get('cors.methods'),
  origin:      config.get('cors.origin'),
  optionsSuccessStatus: 200
}));

app.use(fileUpload({
  limits: {
    abortOnLimit:  config.get('server.uploads.abortOnLimit'),
    fileSize:      config.get('server.uploads.fileLimit'),
    safeFileNames: config.get('server.uploads.safeFileNames')
  }
}));

app.use(session({
  genid: () => uuid(),
  name:   config.get('session.name'),
  secret: config.get('session.secret'),
  resave: config.get('session.resave'),
  cookie: {
    secure: config.get('session.cookie.secure')
  },
  saveUninitialized: false,
  store: new SessionStore(session)
}));

// Enable logging.
switch (process.env.NODE_ENV) {
  case 'production':
  case 'qa':
  case 'staging':
    app.use(logger('combined'));
    break;

  case 'test':
    break;

  default:
    app.use(logger('dev'));
}

// Init database (if available).
Database(db => {

  // Enable routes.
  app.use(config.get('router.prefix'), indexRouter({config, db}));

  if (process.env.NODE_ENV === undefined) {
    app.use('/api-doc/', swaggerUi.serve, swaggerUi.setup(swaggerJson));
    app.use('/app-doc/', express.static('doc'));
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
});

/**
 * @export default {Express}
 */
export default app;
