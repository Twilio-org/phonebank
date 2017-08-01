import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import { development as devconfig } from '../../knexfile';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
bookshelf.plugin(bookshelfBcrypt);

bookshelf.knex.schema.hasTable('users').then((exist) => {
  if (!exist) {
    bookshelf.knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('email').notNullable().unique().index();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('phone_number').notNullable();
      table.string('password_hash').notNullable();
      table.boolean('is_admin').defaultTo(false);
      table.boolean('is_banned').defaultTo(false);
      table.boolean('is_active').defaultTo(true);
      table.timestamp('date_created').defaultTo(bookshelf.knex.fn.now());
      table.timestamp('date_updated').defaultTo(bookshelf.knex.fn.now());
    }).then(() => {
      console.log(('Created users table'));
    });
  }
});

bookshelf.knex.schema.hasTable('campaign').then((exist) => {
  if (!exist) {
    bookshelf.knex.schema.createTable('campaign', (table) => {
      table.increments();
      table.string('name').notNullable().unique().index();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.enu('status').notNullable();
      table.integer('contact_list_id').references('contact_lists.id');
      table.integer('script_id').references('scripts.id');
      table.timestamp('date_created').defaultTo(bookshelf.knex.fn.now());
      table.timestamp('date_updated').defaultTo(bookshelf.knex.fn.now());
    }).then(() => {
      console.log(('Created users table'));
    });
  }
});

