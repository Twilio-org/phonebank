import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import Script from './scripts';
import { development as devconfig } from '../../../knexfile';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);

export default function Question(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'questions',
    hasTimestamps: true,
    scripts() {
      return this.belongsToMany(Script(bookshelf));
    }
  });
}
