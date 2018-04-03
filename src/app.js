'use strict';

import express      from 'express';
import cookieParser from 'cookie-parser';
import logger       from 'morgan';

// Local modules.
import indexRouter from './routes/index';

// Init Express.
let app = express();

app.use(logger('dev'));
app.use(cookieParser());

app.use('/', indexRouter);

/**
 * @export default {Express}
 */
export default app;
