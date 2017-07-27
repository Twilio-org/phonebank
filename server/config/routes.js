import path from 'path';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import { passport } from './auth/passportConfig';

export default function routes(app, express) {
  app.use(express.static(path.join(__dirname, '../public/dist/src')));

  app.use('/users',
          passport.authenticate('jwt', { session: false }),
          usersRouter
  );

  app.use('/', indexRouter);
}
