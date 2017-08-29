import db from '../db';
import User from './users';

export default db.Model.extend({
  tableName: 'campaigns',
  hasTimestamps: true,
  users() {
    return this.belongsToMany(User);
  }
});
