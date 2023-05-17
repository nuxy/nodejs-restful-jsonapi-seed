import config         from 'config';
import cors           from 'cors';
import express        from 'express';
import fileUpload     from 'express-fileupload';
import session        from 'express-session';
import {readFileSync} from 'fs';
import swaggerUi      from 'swagger-ui-express';
import {v4 as uuid}   from 'uuid';

// Local modules.
import Database     from './lib/Database.js';
import Logger       from './lib/Logger.js';
import SessionStore from './lib/SessionStore.js';
import SSL          from './lib/SSL.js';
import Routes       from './routes/index.js';

// Swagger example.
const swaggerJson = JSON.parse(readFileSync('swagger.json'));

// Init Express.
const app = express();
app.server = await createServer(app);

// Server options.
app.use(express.json({
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
  app.use(config.get('router.prefix'), Routes({config, db}));

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
async function createServer(requestListener) {
  const sslEnable = config.get('server.http.ssl.enable');
  const version   = config.get('server.http.version');

  const options = {
    ca:   SSL.ca(),
    cert: SSL.cert(),
    key:  SSL.key()
  };

  const protocol = `HTTP/${version}`;
  const status   = `server created (${process.env.NODE_ENV || 'development'})`;

  if (version === 2 && sslEnable) {
    console.log(`${protocol} ${status}`);

    return (await import('https')).createSecureServer(
      options, requestListener
    );
  }

  if (version === 1) {
    if (sslEnable) {
      console.log(`${protocol} SSL ${status}`);

      return (await import('https')).createServer(
        options, requestListener
      );
    } else {
      console.log(`${protocol} ${status}`);

      return (await import('http')).createServer(
        requestListener
      );
    }
  }
}

/**
 * @export default {Express}
 */
export default app;
