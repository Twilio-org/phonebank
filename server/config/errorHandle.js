import debugModule from 'debug';
import normalizePort from './port';
import server from '../app';

const debug = debugModule('phonebank:server');
const port = normalizePort(process.env.PORT || '3000');

export default {
  // catch 404 and forward to error handler
  catchForward: (req, res, next) => {
    const err = new Error('Not Found');

    err.status = 404;
    next(err);
  },

  // error handler
  handleError: (err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
  },

  // Event listener for HTTP server "error" event.
  onError: (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string'
      ? `Pipe ${port}`
      : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  },

  // Event listener for HTTP server "listening" event.
  onListening: () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  }
};
