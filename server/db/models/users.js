import db from '../db';
import Campaign from './campaigns';
import Call from './calls';

export default db.Model.extend({
  tableName: 'users',
  bcrypt: { field: 'password_hash' },
  hasTimestamps: true,
  campaigns() {
    return this.belongsToMany(Campaign);
  },
  calls() {
    return this.hasMany(Call);
  }
});
