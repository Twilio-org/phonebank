export default function Campaign(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'campaigns',
    hasTimestamps: true
  });
}

