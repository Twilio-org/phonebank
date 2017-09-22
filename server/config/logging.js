import winston from 'winston';
import fs from 'fs';

const logDirectory = 'logs';
const ENV = process.env.NODE_ENV || 'dev';

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const createTimeStamp = () => new Date();

const appLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      // options for console logger
      name: 'console-bug-log',
      timestamp: createTimeStamp,
      level: 'debug',
      colorize: true
    }),
    new (winston.transports.File)({
      // options for fs log
      name: 'error-log',
      filename: `${logDirectory}/error_log.log`,
      timestamps: createTimeStamp,
      // if not in dev, we do not want to log errors to the console... I think.
      level: 'error'
    }),
    new (winston.transports.File)({
      // options for fs log
      name: 'info-log',
      filename: ENV === 'dev' ? `${logDirectory}/debug_log.log` : `${logDirectory}/info_log.log`,
      timestamps: createTimeStamp,
      // if not in dev, we do not want to log errors to the console... I think.
      level: ENV === 'dev' ? 'debug' : 'info'
    })
  ]
});

export default appLogger;
