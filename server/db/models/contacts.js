import ContactList from './contact_lists';

export default function Contact(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'contacts',
    hasTimestamps: true,
    contact_lists() {
      return this.belongsToMany(ContactList);
    }
  });
}
