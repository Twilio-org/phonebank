import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import { expect, Should } from 'chai';
import { test as testconfig } from '../../../knexfile';
import contactService from '../../../server/db/services/contacts';
import Model from '../../../server/db/models/contacts';

const knex = knexModule(testconfig);
const bookshelf = bookshelfModule(knex);
const contactsModel = Model(bookshelf);
const should = Should();

describe('Contact service tests', () => {
  beforeEach((done) => {
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
          done();
        }).catch((err) => {
          console.log('Error creating contacts table', err);
        });
      }
    });
  });

  afterEach((done) => {
    bookshelf.knex.schema.dropTable('contacts').then(() => {
      console.log('dropped contacts table');
      done();
    });
  });
});

