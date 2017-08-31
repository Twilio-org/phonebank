import db from '../db';
import Script from './scripts';
import Response from './responses';

export default db.Model.extend({
  tableName: 'questions',
  hasTimestamps: true,
  scripts() {
    return this.belongsToMany(Script);
  },
  responses() {
    return this.hasMany(Response);
  }
});
