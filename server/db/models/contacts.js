import db from '../db';
import ContactList from './contact_lists';
import Call from './calls';

export default db.Model.extend({
  tableName: 'contacts',
  hasTimestamps: true,
  contact_lists() {
    return this.belongsToMany(ContactList);
  },
  calls() {
    return this.hasMany(Call);
  }
});
