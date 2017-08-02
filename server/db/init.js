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
      table.increments('id').primary();
      table.string('email').notNullable().unique().index();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('phone_number').notNullable();
      table.string('password_hash').notNullable();
      table.boolean('is_admin').defaultTo(false);
      table.boolean('is_banned').defaultTo(false);
      table.boolean('is_active').defaultTo(true);
      table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
      table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
    }).then(() => {
      console.log(('Created users table'));
    });
  }
});

bookshelf.knex.schema.hasTable('contacts').then((exist) => {
  if (!exist) {
    bookshelf.knex.schema.createTable('contacts', (table) => {
      table.increments('id').primary();
      table.string('external_id').nullable();
      table.string('first_name').notNullable();
      table.string('last_name').nullable();
      table.string('email').nullable();
      table.string('phone_number').notNullable().unique().index();
      table.boolean('is_invalid_number').defaultTo(false);
      table.boolean('do_not_call').defaultTo(false);
      table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
      table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
    }).then(() => {
      console.log(('Created contacts table'));
    });
  }
});

bookshelf.knex.schema.hasTable('contact_lists').then((exist) => {
  if (!exist) {
    bookshelf.knex.schema.createTable('contact_lists', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
      table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
    }).then(() => {
      console.log(('Created contact_lists table'));
    });
  }
});

bookshelf.knex.schema.hasTable('contacts_to_contact_lists').then((exist) => {
  if (!exist) {
    bookshelf.knex.schema.createTable('contacts_to_contact_lists', (table) => {
      table.integer('contact_id').references('contacts.id').notNullable();
      table.integer('contact_list_id').references('contact_lists.id').notNullable();
    }).then(() => {
      console.log(('Created contacts_to_contact_lists table'));
    });
  }
});
