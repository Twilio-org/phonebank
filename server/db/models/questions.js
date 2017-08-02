import Script from './scripts';

export default function Question(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'questions',
    hasTimestamps: true,
    scripts() {
      return this.belongsToMany(Script);
    }
  });
}
