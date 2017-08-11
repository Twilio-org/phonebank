export default function User(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'users',
    bcrypt: { field: 'password_hash' },
    hasTimestamps: true
  });
}
