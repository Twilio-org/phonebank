import db from '../db';
import Question from './questions';
import Campaign from './campaigns';

export default db.Model.extend({
  tableName: 'scripts',
  hasTimestamps: true,
  questions() {
    return this.belongsToMany(Question);
  },
  campaigns() {
    return this.belongsTo(Campaign);
  }
});
