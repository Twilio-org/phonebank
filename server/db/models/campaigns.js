import db from '../db';
import User from './users';
import Call from './calls';

export default db.Model.extend({
  tableName: 'campaigns',
  hasTimestamps: true,
  users() {
    return this.belongsToMany(User);
  },
  calls() {
    return this.hasMany(Call);
  }
});
