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
  beforeEach((done) => {
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
          done();
        }).catch(err => console.log(err));
      }
    });
  });

  afterEach((done) => {
    bookshelf.knex.schema.dropTable('scripts').then((table) => {
      console.log('dropped scripts table');
      done();
    })
  });

  describe('Data insertion', function() {
    beforeEach((done) => {
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

      scriptsService.saveNewScript(this.scriptSaveParams1, ScriptsModel)
        .then(script => done());
    }) ;

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
          expect(script.attributes.description).to.equal(params.description);
          done();
        }, done);
    });

    it('the first script should only have 6 attributes after saving',
       (done) => {
         scriptsService.saveNewScript(this.scriptSaveParams1, ScriptsModel)
           .then((script) => {
             const scriptProperties = Object.keys(script.attributes);

             expect(scriptProperties.length).to.equal(6);
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
          expect(script.attributes.description).to.equal(params.description);
          done();
        }, done);
    });

    it('the second script should only have 6 attributes after saving',
       (done) => {
         const params = this.scriptSaveParams2;

         scriptsService.saveNewScript(params, ScriptsModel)
           .then((script) => {
             const scriptProprertyKeys = Object.keys(script.attributes);

             expect(scriptProprertyKeys.length).to.equal(6);
             done();
           }, done);
       });
  });

  describe('Data retrieval', function() {
    beforeEach((done) => {
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

      scriptsService.saveNewScript(this.scriptSaveParams1, ScriptsModel)
        .then((script) => {
          scriptsService.saveNewScript(this.scriptSaveParams2, ScriptsModel)
            .then((script2) => {
              console.log('saved second script');
              this.secondScriptId = script2.attributes.id;
              return script2;
            }).then(thing => done());
          console.log('saved first script');
          this.firstScriptId = script.attributes.id;
          return script;
        });
    });

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

         scriptsService.getScriptById({ id: this.firstScriptId }, ScriptsModel)
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

         scriptsService.getScriptById({ id: this.secondScriptId }, ScriptsModel)
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

  describe('Data update', function() {
    beforeEach((done) => {
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

      this.scriptUpdateParams1 = {
        id: 1,
        name: 'New Script Name 1',
        body: 'New Script Body 1',
        description: 'New Script Description 1'
      };

      this.scriptUpdateParams2 = {
        id: 2,
        name: 'New Script Name 2',
        body: 'New Script Body 2',
        description: 'New Script Description 2'
      };

      scriptsService.saveNewScript(this.scriptSaveParams1, ScriptsModel)
        .then((script) => {
          scriptsService.saveNewScript(this.scriptSaveParams2, ScriptsModel)
            .then((script2) => {
              console.log('saved second script');
              return script2;
            }).then(thing => done());
          console.log('saved first script');
          return script;
        });
    });


    it('should update first script\'s name by ID', (done) => {
      const params = { id: this.scriptUpdateParams1.id };

      scriptsService.updateScriptById(params, ScriptsModel)
        .then(script => script.attributes.name)
        .then((name) => {
          expect(name).to.equal(params.name);
          done();
        }, done);
    });

    it('should update second script\'s description by ID', (done) => {
      const params = { id: this.scriptUpdateParams1.id };

      scriptsService.updateScriptById(params, ScriptsModel)
        .then(script => script.attributes.description)
        .then((description) => {
          expect(description).to.equal(params.description);
          done();
        }, done);
    });
  });

  describe('data destruction', function() {
    beforeEach(() => {
      this.scriptDeleteParams1 = {
        id: 1,
        name: 'Script Name 1',
        body: 'Script Body 1',
        description: 'Script Description 1'
      };

      this.scriptDeleteParams2 = {
        id: 2,
        name: 'Script Name 2',
        body: 'Script Body 2',
        description: 'Script Description 2'
      };
    });

    it('should delete both records by ID', (done) => {
      const params1 = { id: this.scriptDeleteParams1.id };
      const params2 = { id: this.scriptDeleteParams2.id };

      scriptsService.deleteScriptById(params1, ScriptsModel)
        .then((script) => {
          should.exist(script);
          expect(script.attributes).to.be.empty;
        }, done);

      scriptsService.deleteScriptById(params2, ScriptsModel)
        .then((script) => {
          should.exist(script);
          expect(script.attributes).to.be.empty;
          done();
        }, done);
    });
  });
});
