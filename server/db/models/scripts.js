import knexModule from 'knex';
import bookshelfModule from 'bookshelf';

import Question from './questions';
import { development as devconfig } from '../../../knexfile';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
const QuestionModel = Question(bookshelf);

export default function Script(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'scripts',
    hasTimestamps: true,
    questions() {
      return this.belongsToMany(QuestionModel);
    }
  });
}
