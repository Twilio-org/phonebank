import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import { development as devconfig } from '../../knexfile';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
bookshelf.plugin(bookshelfBcrypt);

bookshelf.knex.schema.hasTable('users').then((exist) => {
  if (!exist) {
    bookshelf.knex.schema.createTableIfNotExists('users', (table) => {
      table.increments();
      table.string('email').notNullable().unique().index();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('phoneNumber').notNullable();
      table.string('passwordHash').notNullable();
      table.boolean('isAdmin').defaultTo(false);
      table.boolean('isBanned').defaultTo(false);
      table.boolean('isActive').defaultTo(true);
      table.timestamp('dateCreated').defaultTo(bookshelf.knex.fn.now());
      table.timestamp('dateUpdated').defaultTo(bookshelf.knex.fn.now());
    }).then(() => {
      console.log(('Created users table'));
    });
  }
});
