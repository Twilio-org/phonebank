/* eslint-disable jest/valid-expect */

import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import { expect, Should } from 'chai';
import { test as testconfig } from '../../../knexfile';
import scriptsService from '../../../server/db/services/scripts';
import Model from '../../../server/db/models/scripts';

const knex = knexModule(testconfig);
const bookshelf = bookshelfModule(knex);
const ScriptsModel = Model(bookshelf);
const should = Should();

describe('Script service tests', () => {
  before(() => {
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
          console.log(('Created scripts table'));
        }).catch(err => console.log(err));
      }
    });
  });

  after(() => bookshelf.knex.schema.dropTable('scripts'));

  describe('Data insertion', () => {
    beforeEach(() => {
      this.scriptSaveParams1 = {
        name: 'Script Name 1',
        body: 'Script Body 1',
        description: 'Script Description 1'
      };

      this.scriptSaveParams2 = {
        name: 'Script Name 2',
        body: 'Script Body 2',
        description: 'Script Description 2'
      };
    });

    it('should be able to save first script\'s name', (done) => {
      const params = this.scriptSaveParams1;
      const { name } = params;

      scriptsService.saveNewScript(params, ScriptsModel)
        .then((script) => {
          expect(script.attributes.name).to.equal(name);
          done();
        }, done);
    });

    it('should be able to save first script\'s body', (done) => {
      const params = this.scriptSaveParams1;

      scriptsService.saveNewScript(params, ScriptsModel)
        .then((script) => {
          expect(script.attributes.body).to.equal(params.body);
          done();
        }, done);
    });

    it('should be able to save first script\'s description', (done) => {
      const params = this.scriptSaveParams1;

      scriptsService.saveNewScript(params, ScriptsModel)
        .then((script) => {
          expect(script.attributes.name).to.equal(params.description);
          done();
        }, done);
    });

    it('the first script should only have 5 attributes after saving',
       (done) => {
         scriptsService.saveNewScript(this.scriptSaveParams1, ScriptsModel)
           .then((script) => {
             const scriptProperties = Object.values(script.attributes);

             expect(scriptProperties.length).to.equal(5);
             done();
           }, done);
       });

    it('should be able to save second script\'s name', (done) => {
      const params = this.scriptSaveParams2;
      const { name } = params;

      scriptsService.saveNewScript(params, ScriptsModel)
        .then((script) => {
          expect(script.attributes.name).to.equal(name);
          done();
        }, done);
    });

    it('should be able to save second script\'s body', (done) => {
      const params = this.scriptSaveParams2;

      scriptsService.saveNewScript(params, ScriptsModel)
        .then((script) => {
          expect(script.attributes.body).to.equal(params.body);
          done();
        }, done);
    });

    it('should be able to save second script\'s description', (done) => {
      const params = this.scriptSaveParams2;

      scriptsService.saveNewScript(params, ScriptsModel)
        .then((script) => {
          expect(script.attributes.name).to.equal(params.description);
          done();
        }, done);
    });

    it('the second script should only have 5 attributes after saving',
       (done) => {
         const params = this.scriptSaveParams2;

         scriptsService.saveNewScript(params, ScriptsModel)
           .then((script) => {
             const scriptProprertyKeys = Object.keys(script.attributes);

             expect(scriptProprertyKeys.length).to.equal(5);
             done();
           }, done);
       });
  });

  describe('Data retrieval', () => {
    it('should retrieve all scripts', (done) => {
      scriptsService.getAllScripts(ScriptsModel)
        .then((scripts) => {
          should.exist(scripts);
          expect(scripts.length).to.equal(2);
          done();
        }, done);
    });

    it('should retrieve first script\'s name, body, and description by ID',
       (done) => {
         const { name, body, description } = this.scriptSaveParams1;

         scriptsService.getScriptById({ id: 1 }, ScriptsModel)
           .then((script) => {
             const attributes = script.attributes;

             should.exist(script);
             expect(attributes.name).to.equal(name);
             expect(attributes.body).to.equal(body);
             expect(attributes.description).to.equal(description);
             done();
           }, done);
       });

    it('should retrieve second script\'s name, body, and description by ID',
       (done) => {
         const { name, body, description } = this.scriptSaveParams2;

         scriptsService.getScriptById({ id: 2 }, ScriptsModel)
           .then((script) => {
             const attributes = script.attributes;

             should.exist(script);
             expect(attributes.name).to.equal(name);
             expect(attributes.body).to.equal(body);
             expect(attributes.description).to.equal(description);
             done();
           }, done);
       });
  });

  describe('Data update', () => {
    beforeEach(() => {
      this.scriptSaveParams1 = {
        id: 1,
        name: 'New Script Name 1',
        body: 'New Script Body 1',
        description: 'New Script Description 1'
      };

      this.scriptSaveParams2 = {
        id: 2,
        name: 'New Script Name 2',
        body: 'New Script Body 2',
        description: 'New Script Description 2'
      };
    });


    it('should update first script\'s name by ID', (done) => {
      const params = this.scriptUpdateParams1;

      scriptsService.updateScriptById(params, ScriptsModel)
        .then(script => script.attributes.name)
        .then((name) => {
          expect(name).to.equal(params.name);
          done();
        }, done);
    });

    it('should update second script\'s description by ID', (done) => {
      const params = this.scriptUpdateParams1;

      scriptsService.updateScriptById(params, ScriptsModel)
        .then(script => script.attributes.description)
        .then((description) => {
          expect(description).to.equal(params.description);
          done();
        }, done);
    });
  });

  describe('data destruction', () => {
    it('should delete both records by ID', (done) => {
      const params1 = this.scriptSaveParams1;
      const params2 = this.scriptSaveParams2;

      scriptsService.deleteScriptById(params1, ScriptsModel)
        .then((script) => {
          expect(script).to.equal(null);
          done();
        }, done);

      scriptsService.deleteScriptById(params2, ScriptsModel)
        .then((script) => {
          expect(script).to.equal(null);
        }, done);
    });
  });
});
