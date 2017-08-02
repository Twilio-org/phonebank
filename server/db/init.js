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
      console.log('Created users table');
    }).catch(err => console.log('Error creating users table', err));
  }
});

bookshelf.knex.schema.hasTable('scripts').then((exist) => {
  if (!exist) {
    bookshelf.knex.schema.createTable('scripts', (table) => {
      table.increments().primary();
      table.string('name').notNullable().index();
      table.text('body').notNullable();
      table.text('description').notNullable();
      table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
      table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
    }).then(() => {
      console.log('Created scripts table');
    }).catch(err => console.log('Error creating scripts table', err));
  }
});

bookshelf.knex.schema.hasTable('questions').then((exist) => {
  if (!exist) {
    bookshelf.knex.schema.createTable('questions', (table) => {
      table.increments().primary();
      table.string('title').notNullable().index();
      table.text('description').notNullable().index();
      table.enu('type', ['multiselect', 'singleselect', 'paragraph']).notNullable();
      table.text('responses').notNullable();
      table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
      table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
    }).then(() => {
      console.log('Created questions table');
    }).catch(err => console.log('Error creating questions table', err));
  }
});

bookshelf.knex.schema.hasTable('campaigns').then((exist) => {
  if (!exist) {
    bookshelf.knex.schema.createTable('campaigns', (table) => {
      table.increments();
      table.string('name').notNullable().unique().index();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.enu('status', ['draft', 'active', 'pause', 'completed']).notNullable();
      table.integer('script_id').references('scripts.id').notNullable();
      table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
      table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
    }).then(() => {
      console.log(('Created campaigns table'));
    }).catch(err => console.log('Error creating campaigns table', err));
  }
});

bookshelf.knex.schema.hasTable('scripts_to_questions').then((exist) => {
  if (!exist) {
    bookshelf.knex.schema.createTable('scripts_to_questions', (table) => {
      table.increments().primary();
      table.integer('script_id').references('scripts.id').notNullable();
      table.integer('question_id').references('questions.id').notNullable();
      table.integer('sequence_number').notNullable();
      table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
      table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
    }).then(() => {
      console.log('Created scripts_to_questions table');
    }).catch(err => console.log('Error creating scripts_to_questions table', err));
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
    }).catch(err => console.log('Error creating contacts table', err));
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
    }).catch(err => console.log('Error creating contact_lists table', err));
  }
});

bookshelf.knex.schema.hasTable('contacts_to_contact_lists').then((exist) => {
  if (!exist) {
    bookshelf.knex.schema.createTable('contacts_to_contact_lists', (table) => {
      table.increments('id').primary();
      table.integer('contact_id').references('contacts.id').notNullable();
      table.integer('contact_list_id').references('contact_lists.id').notNullable();
      table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
      table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
    }).then(() => {
      console.log(('Created contacts_to_contact_lists table'));
    }).catch(err => console.log('Error creating contacts_to_contact_lists table', err));
  }
});
