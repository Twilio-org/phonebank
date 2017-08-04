import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import Contact from './contacts';
import Campaign from './campaigns';
import { development as devconfig } from '../../../knexfile';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);


export default function ContactList(bookshelfObj) {
  return bookshelfObj.Model.extend({
    tableName: 'contact_lists',
    hasTimestamps: true,
    contacts() {
      return this.belongsToMany(Contact(bookshelf));
    },
    campaigns() {
      return this.belongsTo(Campaign(bookshelf));
    }
  });
}
