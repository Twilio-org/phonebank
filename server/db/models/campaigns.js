import db from '../db';

export default db.Model.extend({
  tableName: 'campaigns',
  hasTimestamps: true
});
