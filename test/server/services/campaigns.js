import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import bcrypt from 'bcrypt';
import { expect, Should } from 'chai';
import { test as testconfig } from '../../../knexfile';
import campaignsService from '../../../server/db/services/campaigns';
import Campaign from '../../../server/db/models/campaigns';
import Script from '../../../server/db/models/scripts';

const knex = knexModule(testconfig);
const knexdb = bookshelfModule(knex).plugin(bookshelfBcrypt);
const campaignModel = Campaign(knexdb);
const scriptModel = Script(knexdb);
const should = Should();


describe('Campaign service tests', () => {
  before((done) => {
    function createCampaignsTable() {
      return knexdb.knex.schema.hasTable('campaigns').then((exist) => {
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
    }
    function createScriptsTable() {
      return knexdb.knex.schema.hasTable('scripts').then((exist) => {
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
    }
    function createQuestionsTable() {
      return knexdb.knex.schema.hasTable('questions').then((exist) => {
        if (!exist) {
          knexdb.knex.schema.createTable('questions', (table) => {
            table.increments().primary();
            table.string('title').notNullable().index();
            table.text('description').notNullable().index();
            table.enu('type', ['multiselect', 'singleselect', 'paragraph']).notNullable();
            table.text('responses').notNullable();
            table.timestamp('created_at').defaultTo(knexdb.knex.fn.now());
            table.timestamp('updated_at').defaultTo(knexdb.knex.fn.now());
          }).then(() => {
            console.log('Created questions table');
          }).catch(err => console.log('Error creating questions table', err));
        }
      });
    }

    createCampaignsTable().then(() => {
      createScriptsTable().then(() => {
        createQuestionsTable().then(() => {
          done();
        });
      });
    });
  });


  after(() => {
    const queryString = 'DROP TABLE campaigns, scripts, questions';
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

      const { name, body, description } = this.scriptParams;

      return knexdb.knex.schema.raw(`INSERT INTO scripts (name, body, description) VALUES ('${name}', '${body}', '${description}')`);
    });

    it('should save new campaign', (done) => {
      campaignsService.saveNewCampaign(this.campaignParams1, campaignModel)
        .then((campaign) => {
          expect(campaign.attributes.name).to.equal(this.campaignParams1.name);
          expect(campaign.attributes.title).to.equal(this.campaignParams1.title);
          expect(campaign.attributes.description).to.equal(this.campaignParams1.description);
          expect(campaign.attributes.status).to.equal(this.campaignParams1.status);
          expect(campaign.attributes.script_id).to.equal(this.campaignParams1.script_id);
          done();
        });
    });

    it('should get all campaigns', (done) => {
      campaignsService.getAllCampaigns(null, campaignModel)
        .then((campaigns) => {
          const { models } = campaigns;
          expect(models).to.have.length(1);
          expect(models[0].attributes.name).to.equal(this.campaignParams1.name);
          expect(models[0].attributes.title).to.equal(this.campaignParams1.title);
          expect(models[0].attributes.description).to.equal(this.campaignParams1.description);
          expect(models[0].attributes.status).to.equal(this.campaignParams1.status);
          expect(models[0].attributes.script_id).to.equal(this.campaignParams1.script_id);
          done();
        });
    });
  });

});