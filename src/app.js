'use strict';

import config  from 'config';
import express from 'express';
import http    from 'http';
import logger  from 'morgan';

// Local modules.
import indexRouter from './routes/index';

// Init Express.
let app = express();
app.server = http.createServer(app);

app.disable('x-powered-by');

app.use(logger('dev'));

app.use('/', indexRouter({config}));

// Launch server.
app.server.listen(3000, () => {
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
