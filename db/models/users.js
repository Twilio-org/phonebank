var bookshelf = require('../init');
var bcrypt = ('bcrypt');
var bookshelf_bcrypt = require('bookshelf-bcrypt');

bookshelf.plugin(bookshelf_bcrypt);

const User = bookshelf.Model.extend({
  tableName: 'users',
  bcrypt: { field: 'password' },
  hasTimestamps: true
});
