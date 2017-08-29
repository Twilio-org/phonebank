import bookshelfBcrypt from 'bookshelf-bcrypt';
import bookshelfModule from 'bookshelf';
import knexModule from 'knex';

const config = {
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  debug: process.env.DEBUG
};
const knex = knexModule(config);
const bookshelf = bookshelfModule(knex);
bookshelf.plugin(bookshelfBcrypt);

const createContactsTable = () =>
  bookshelf.knex.schema.hasTable('contacts').then((exist) => {
    if (!exist) {
      return bookshelf.knex.schema.createTable('contacts', (table) => {
        table.increments('id').primary();
        table.string('external_id').nullable();
        table.string('first_name').notNullable();
        table.string('last_name').nullable();
        table.string('email').nullable();
        table.string('phone_number').notNullable();
        table.unique(['first_name', 'phone_number']);
        table.boolean('is_invalid_number').defaultTo(false);
        table.boolean('do_not_call').defaultTo(false);
        table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
        table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
      });
    }
    return exist;
  });

const createContactListsTable = () =>
  bookshelf.knex.schema.hasTable('contact_lists').then((exist) => {
    if (!exist) {
      return bookshelf.knex.schema.createTable('contact_lists', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable().unique();
        table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
        table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
      });
    }
    return exist;
  });

const createContactsContactListsTable = () =>
  bookshelf.knex.schema.hasTable('contact_lists_contacts').then((exist) => {
    if (!exist) {
      return bookshelf.knex.schema.createTable('contact_lists_contacts', (table) => {
        table.increments('id').primary();
        table.integer('contact_id').references('contacts.id').notNullable();
        table.integer('contact_list_id').references('contact_lists.id').notNullable();
        table.unique(['contact_id', 'contact_list_id']);
        table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
        table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
      });
    }
    return exist;
  });

const createScriptsTable = () =>
  bookshelf.knex.schema.hasTable('scripts').then((exist) => {
    if (!exist) {
      return bookshelf.knex.schema.createTable('scripts', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable().unique().index();
        table.text('body').notNullable();
        table.text('description').notNullable();
        table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
        table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
      });
    }
    return exist;
  });

const createQuestionsTable = () =>
  bookshelf.knex.schema.hasTable('questions').then((exist) => {
    if (!exist) {
      return bookshelf.knex.schema.createTable('questions', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable().unique().index();
        table.text('description').notNullable().index();
        table.enu('type', ['multiselect', 'singleselect', 'paragraph']).notNullable();
        table.text('responses').notNullable();
        table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
        table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
      });
    }
    return exist;
  });

const createQuestionsScriptsTable = () =>
  bookshelf.knex.schema.hasTable('questions_scripts').then((exist) => {
    if (!exist) {
      return bookshelf.knex.schema.createTable('questions_scripts', (table) => {
        table.increments('id').primary();
        table.integer('script_id').references('scripts.id').notNullable();
        table.integer('question_id').references('questions.id').notNullable();
        table.integer('sequence_number').notNullable();
        table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
        table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
        table.unique(['script_id', 'question_id']);
      });
    }
    return exist;
  });

const createCampaignsTable = () =>
  bookshelf.knex.schema.hasTable('campaigns').then((exist) => {
    if (!exist) {
      return bookshelf.knex.schema.createTable('campaigns', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable().unique().index();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.enu('status', ['draft', 'active', 'pause', 'completed']).notNullable();
        table.integer('contact_lists_id').references('contact_lists.id').notNullable();
        table.integer('script_id').references('scripts.id').notNullable();
        table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
        table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
      });
    }
    return exist;
  });

const createUsersTable = () =>
  bookshelf.knex.schema.hasTable('users').then((exist) => {
    if (!exist) {
      return bookshelf.knex.schema.createTable('users', (table) => {
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
      });
    }
    return exist;
  });

const createCallsTable = () =>
  bookshelf.knex.schema.hasTable('calls').then((exist) => {
    if (!exist) {
      return bookshelf.knex.schema.createTable('calls', (table) => {
        table.increments('id').primary();
        table.integer('campaign_id').references('campaigns.id').notNullable();
        table.integer('contact_id').references('contacts.id').notNullable();
        table.enu('attempt_num', ['1', '2', '3']).defaultTo('1').notNullable();
        table.unique(['campaign_id', 'contact_id', 'attempt_num']);
        table.integer('user_id').references('users.id');
        table.enu('status', ['AVAILABLE', 'ASSIGNED', 'IN_PROGRESS', 'ATTEMPTED']).defaultTo('AVAILABLE').notNullable();
        table.enu('outcome', ['PENDING', 'ANSWERED', 'BAD_NUMBER', 'DO_NOT_CALL', 'LEFT_MSG', 'NO_ANSWER', 'INCOMPLETE']).defaultTo('PENDING').notNullable();
        table.string('notes');
        table.string('call_sid', 32);
        table.timestamp('call_started');
        table.timestamp('call_ended');
        table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
        table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
      });
    }
    return exist;
  });

const setup = () =>
  createContactsTable()
  .then(createContactListsTable)
  .then(createContactsContactListsTable)
  .then(createScriptsTable)
  .then(createQuestionsTable)
  .then(createQuestionsScriptsTable)
  .then(createCampaignsTable)
  .then(createUsersTable)
  .then(createCallsTable)
  .then(() => {
    console.log('Created all tables');
  })
  .catch((err) => {
    console.error('Error creating tables: ', err);
  });

const teardown = () =>
  bookshelf.knex.schema.dropTable('calls')
  .then(() => bookshelf.knex.schema.dropTable('campaigns'))
  .then(() => bookshelf.knex.schema.dropTable('questions_scripts'))
  .then(() => bookshelf.knex.schema.dropTable('questions'))
  .then(() => bookshelf.knex.schema.dropTable('scripts'))
  .then(() => bookshelf.knex.schema.dropTable('contact_lists_contacts'))
  .then(() => bookshelf.knex.schema.dropTable('contact_lists'))
  .then(() => bookshelf.knex.schema.dropTable('contacts'))
  .then(() => bookshelf.knex.schema.dropTable('users'))
  .then(() => {
    console.log('Dropped all tables');
  })
  .catch((err) => {
    console.error('Error dropping tables', err);
  });

export default bookshelf;
export { bookshelf, setup, teardown };
