export default function ContactList(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'contact_lists',
    hasTimestamps: true
  });
}
