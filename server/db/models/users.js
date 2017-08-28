import db from '../db';
import Campaign from './campaigns';

export default db.Model.extend({
  tableName: 'users',
  bcrypt: { field: 'password_hash' },
  hasTimestamps: true,
  campaigns() {
    return this.belongsToMany(Campaign);
  }
});
