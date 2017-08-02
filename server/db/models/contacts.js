export default function Contact(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'contacts',
    hasTimestamps: true
  });
}
