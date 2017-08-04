import knexModule from 'knex';
import bookshelfModule from 'bookshelf';

import { development as devconfig } from '../../../knexfile';
import Question from './questions';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);

export default function Script(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'scripts',
    hasTimestamps: true,
    questions() {
      return this.belongsToMany(Question(bookshelf));
    }
  });
}
