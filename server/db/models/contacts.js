import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import ContactList from './contact_lists';
import { development as devconfig } from '../../../knexfile';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);

export default function Contact(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'contacts',
    hasTimestamps: true,
    contact_lists() {
      return this.belongsToMany(ContactList(bookshelf));
    }
  });
}
