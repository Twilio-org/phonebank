import db from '../db';
import Campaign from './campaigns';
import User from './users';
import Contact from './contacts';
import Response from './responses';

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
  },
  responses() {
    return this.hasMany(Response);
  }
});
