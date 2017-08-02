import Contacts from './contacts';

export default function ContactList(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'contact_lists',
    hasTimestamps: true,
    contacts: function () {
      return this.belongsToMany(Contacts);
    }
  });
}
