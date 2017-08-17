import db from '../db';

export default db.Model.extend({
  tableName: 'users',
  bcrypt: { field: 'password_hash' },
  hasTimestamps: true
});
