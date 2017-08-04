import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import bcrypt from 'bcrypt';
import { expect, Should } from 'chai';
import { test as testconfig } from '../../../knexfile';
import { saveNewCampaign, getAllCampaign } from '../../../server/db/services/campaigns';
import Campaign from '../../../server/db/models/campaigns';
import Script from '../../../server/db/models/scripts';

const knex = knexModule(testconfig);
const knexdb = bookshelfModule(knex).plugin(bookshelfBcrypt);
const campaignModel = Campaign(knexdb);
const scriptModel = Script(knexdb);
const should = Should();


describe('Campaign service tests', () => {
  before(() => {
    knexdb.knex.schema.hasTable('campaigns').then((exist) => {
      if (!exist) {
        knexdb.knex.schema.createTable('campaigns', (table) => {
          table.increments();
          table.string('name').notNullable().unique().index();
          table.string('title').notNullable();
          table.string('description').notNullable();
          table.enu('status', ['draft', 'active', 'pause', 'completed']).notNullable();
          table.integer('script_id').references('scripts.id').notNullable();
          table.timestamp('created_at').defaultTo(knexdb.knex.fn.now());
          table.timestamp('updated_at').defaultTo(knexdb.knex.fn.now());
        }).then(() => {
          console.log(('Created campaigns table'));
        }).catch(err => console.log('Error creating campaigns table', err));
      }
    }); 

    knexdb.knex.schema.hasTable('scripts').then((exist) => {
      if (!exist) {
        knexdb.knex.schema.createTable('scripts', (table) => {
          table.increments().primary();
          table.string('name').notNullable().index();
          table.text('body').notNullable();
          table.text('description').notNullable();
          table.timestamp('created_at').defaultTo(knexdb.knex.fn.now());
          table.timestamp('updated_at').defaultTo(knexdb.knex.fn.now());
        }).then(() => {
          console.log('Created scripts table');
        }).catch(err => console.log('Error creating scripts table', err));
      }
    });
  });

  after(() => {
    const queryString = 'DROP TABLE users, campaigns, scripts_to_questions, scripts, questions';
    return knexdb.knex.schema.raw(queryString);
  });

  describe('Data insertion', function() {
    before(() => {
      this.scriptParams = {
        name: 'testScript',
        body: 'Hello, my name is Joe',
        description: 'Greetings'
      };

      this.campaignParams1 = {
        name: 'testCampaign1',
        title: 'Test1',
        description: 'election',
        status: 'draft',
        script_id: 1
      };
    });
  });
});
