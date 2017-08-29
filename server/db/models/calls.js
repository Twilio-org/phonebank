import db from '../db';

export default db.Model.extend({
  tableName: 'calls',
  hasTimeStamps: true
});
