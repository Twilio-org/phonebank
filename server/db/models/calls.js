import db from '../db';
import Campaign from './campaigns';
import User from './users';
import Contact from './contacts';

export default db.Model.extend({
  tableName: 'calls',
  hasTimeStamps: true,
  campaigns() {
    return this.belongsTo(Campaign);
  },
  contacts() {
    return this.belongsTo(Contact);
  },
  users() {
    return this.belongsTo(User);
  }
});
