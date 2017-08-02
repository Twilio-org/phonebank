import Question from './questions';

export default function Script(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'script',
    hasTimestamps: true,
    questions() {
      return this.belongsToMany(Question);
    }
  });
}
