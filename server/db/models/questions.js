import db from '../db';
import Script from './scripts';

export default db.Model.extend({
  tableName: 'questions',
  hasTimestamps: true,
  scripts() {
    return this.belongsToMany(Script);
  }
});
