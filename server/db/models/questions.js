import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
<<<<<<< HEAD

=======
>>>>>>> ed281a909664b49ac5f8b78273452a04db534842
import { development as devconfig } from '../../../knexfile';
import Script from './scripts';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
const ScriptModel = Script(bookshelf);

export default function Question(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'questions',
    hasTimestamps: true,
    scripts() {
      return this.belongsToMany(ScriptModel);
    }
  });
}
