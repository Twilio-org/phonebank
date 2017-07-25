import bookshelfBcrypt from 'bookshelf-bcrypt';
import bookshelf from '../init';

bookshelf.plugin(bookshelfBcrypt);

const User = bookshelf.Model.extend({
  tableName: 'users',
  bcrypt: { field: 'password_hash' },
  hasTimestamps: false
});

export default User;
