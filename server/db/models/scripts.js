import Question from './questions';
import Campaign from './campaigns';

export default function Script(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'script',
    hasTimestamps: true,
    questions() {
      return this.belongsToMany(Question);
    },
    campaigns() {
      return this.belongsTo(Campaign);
    }
  });
}
