import http from 'http';
import express from 'express';
// import routes from './config/routes';
import middleware from './config/middleware';
import normalizePort from './config/port';
import errorHandle from './config/errorHandle';

const app = express();
const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', errorHandle.onError);
server.on('listening', errorHandle.onListening);

middleware(app, express);
// routes(app, express);

export default server;
