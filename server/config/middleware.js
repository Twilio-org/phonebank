import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import indexRouter from './routes/index';
import scriptsRouter from './routes/scripts';
import questionsRouter from './routes/questions';
import usersRouter from './routes/users';
import authRouter from './routes/authorization';
import campaignsRouter from './routes/campaigns';
import errorHandle from './errorHandle';
import contactsRouter from './routes/contacts';
import contactListsRouter from './routes/contact_lists';
import { passport, serializeLogin } from './auth/local';

export default function middleware(app, express) {
  // use body-parser to format request and attach it to req objects.
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // define where express should look for static assests
  app.use(express.static(path.join(__dirname, '../../public/dist/src')));

  // use passport for authentication
  app.use(passport.initialize());

  // pass the router files for each route
  app.use('/contactLists', contactListsRouter);
  app.use('/contacts', contactsRouter);
  app.use('/scripts', scriptsRouter);
  app.use('/questions', questionsRouter);
  app.use('/users', usersRouter);
  app.use('/auth', authRouter);
  app.use('/campaigns', campaignsRouter);
  app.use('*', indexRouter);

  // pass the logger
  app.use(logger('dev'));

  serializeLogin(passport);

  // pass the
  app.use(errorHandle.catchForward);
  app.use(errorHandle.handleError);
}
