import Contact from './contacts';
import Campaign from './campaigns';

export default function ContactList(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'contact_lists',
    hasTimestamps: true,
    contacts() {
      return this.belongsToMany(Contact);
    },
    campaigns() {
      return this.belongsTo(Campaign);
    }
  });
}
