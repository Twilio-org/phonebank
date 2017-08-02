import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import questionsService from '../services/questions';
import { development as devconfig } from '../../../knexfile';
import Question from './questions';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
const QuestionModel = Question(bookshelf);

export default function Script(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'script',
    hasTimestamps: true,
    questions() {
      return this.belongsToMany(QuestionModel);
    }
  });
}
