import './env.js';
import './mongoose.js';

import express from 'express';
import morgan from 'morgan';

import route from './routes/index.js';
import { notFound, errorHandler } from './middlewares/index.js';

import path from 'path'

const app = express();
app.set('port', process.env.PORT);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
const __dirname = path.resolve()
app.set('views', path.join(__dirname, 'views'))
// routing API
route(app);

// error handler
app.use(notFound);
app.use(errorHandler);

export default app;
