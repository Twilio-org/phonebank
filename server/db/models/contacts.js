import ContactLists from './contact_lists';

export default function Contact(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'contacts',
    hasTimestamps: true,
    contact_lists: function () {
      return this.belongsToMany(ContactLists);
    }
  });
}
