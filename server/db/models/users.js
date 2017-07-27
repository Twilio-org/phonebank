const User = bookshelfObj =>
  bookshelfObj.Model.extend({
    tableName: 'users',
    bcrypt: { field: 'password_hash' },
    hasTimestamps: false
  });

export default User;
