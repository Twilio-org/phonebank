import db from '../db';
import ContactList from './contact_lists';

export default db.Model.extend({
  tableName: 'contacts',
  hasTimestamps: true,
  contact_lists() {
    return this.belongsToMany(ContactList);
  }
});
