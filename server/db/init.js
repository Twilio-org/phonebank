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
      console.log('Created users table');
    });
  }
});

bookshelf.knex.schema.hasTable('scripts').then((exist) => {
  if (!exist) {
    bookshelf.knex.schema.createTable('scripts', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable().unique().index();
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
      table.increments('id').primary();
      table.string('title').notNullable().unique().index();
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

bookshelf.knex.schema.hasTable('questions_scripts').then((exist) => {
  if (!exist) {
    bookshelf.knex.schema.createTable('questions_scripts', (table) => {
      table.increments('id').primary();
      table.integer('script_id').references('scripts.id').notNullable();
      table.integer('question_id').references('questions.id').notNullable();
      table.integer('sequence_number').notNullable();
      table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
      table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
      table.unique(['script_id', 'question_id']);
    }).then(() => {
      console.log('Created scripts_to_questions table');
    }).catch(err => console.log('Error creating scripts_to_questions table', err));
  }
});
