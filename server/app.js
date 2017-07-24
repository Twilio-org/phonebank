import express from 'express';
import path from 'path';
// import favicon from 'serve-favicon'; (defined but never used)
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


import users from './routes/users';
import authenticate from './routes/authenticate';
import register from './routes/register';

import passportModule from './config/auth/passportConfig';

const app = express();

const passport = passportModule.passport;

app.use(passport.initialize());

// initializing env variables


// view engine setup
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public/dist/src')));

app.use('/users', users);
app.use('/authenticate', authenticate);
app.use('/register', register);

app.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

export default app;
