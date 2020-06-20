'use strict';

import bodyParser   from 'body-parser';
import config       from 'config';
import cors         from 'cors';
import express      from 'express';
import fileUpload   from 'express-fileupload';
import session      from 'express-session';
import {v4 as uuid} from 'uuid';

// Local modules.
import Database     from '~/lib/Database.js';
import Logger       from '~/lib/Logger.js';
import SessionStore from '~/lib/SessionStore.js';
import indexRouter  from '~/routes/index.js';

// Swagger examples.
import swaggerUi   from 'swagger-ui-express';
import swaggerJson from '~/../swagger.json';

// Init Express.
const app = express();

app.server = createServer(app);

// Server options.
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
    app.use(Logger('combined'));
    break;

  case 'test':
    break;

  default:
    app.use(Logger('dev'));
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
  const serverPort = config.get('server.port');
  const serverName = config.get('server.name');

  app.server.listen(serverPort, serverName, () => {
    console.log(`Listening to ${serverName} on port ${serverPort}`);
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
 * Returns a new instance of an HTTP server.
 *
 * @param {Function} requestListener
 *
 * @return {Function}
 */
function createServer(requestListener) {
  const sslConfig = config.get('server.http.ssl.config');
  const sslEnable = config.get('server.http.ssl.enable');
  const version   = config.get('server.http.version');

  const protocol = `HTTP/${version}`;

  if (version === 2 && sslEnable) {
    console.log(`${protocol} server created`);

    return require('http2').createSecureServer(
      sslConfig, requestListener
    );
  }

  if (version === 1) {
    if (sslEnable) {
      console.log(`${protocol} SSL server created`);

      return require('https').createServer(
        sslConfig, requestListener
      );
    } else {
      console.log(`${protocol} server created`);

      return require('http').createServer(
        requestListener
      );
    }
  }
}

/**
 * @export default {Express}
 */
export default app;
