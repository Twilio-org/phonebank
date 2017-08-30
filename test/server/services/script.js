/* eslint-disable jest/valid-expect */

import { expect, Should } from 'chai';
import cleanUp from '../bootstrap';
import scriptsService from '../../../server/db/services/scripts';

const should = Should();

describe('Script service tests', () => {
  describe('Data insertion', function() {
    before((done) => {
      this.scriptParams1 = {
        name: 'Script Name 1',
        body: 'Script Body 1',
        description: 'Script Description 1'
      };

      this.scriptParams2 = {
        name: 'Script Name 2',
        body: 'Script Body 2',
        description: 'Script Description 2'
      };

      this.scriptUpdateParams1 = {
        name: 'New Script Name 1',
        body: 'New Script Body 1',
        description: 'New Script Description 1'
      };

      this.scriptUpdateParams2 = {
        name: 'New Script Name 2',
        body: 'New Script Body 2',
        description: 'New Script Description 2'
      };

      done();
    });

    after((done) => {
      cleanUp(done);
    })

    it('should be able to save and verify first script', (done) => {
      const params = this.scriptParams1;
      const { name, body, description } = params;

      scriptsService.saveNewScript(params)
        .then((script) => {
          this.scriptParams1.id = script.attributes.id;
          expect(script.attributes.name).to.equal(name);
          expect(script.attributes.body).to.equal(params.body);
          expect(script.attributes.description).to.equal(params.description);
          expect(Object.keys(script.attributes).length).to.equal(6);
          done();
        }, done);
    });

    it('should be able to save and verify second script', (done) => {
      const params = this.scriptParams2;
      const { name, body, description } = params;

      scriptsService.saveNewScript(params)
        .then((script) => {
          this.scriptParams2.id = script.attributes.id;
          expect(script.attributes.name).to.equal(name);
          expect(script.attributes.body).to.equal(params.body);
          expect(script.attributes.description).to.equal(params.description);
          expect(Object.keys(script.attributes).length).to.equal(6);
          done();
        }, done);
    });

    it('should retrieve all scripts', (done) => {
      scriptsService.getAllScripts()
        .then((scripts) => {
          should.exist(scripts);
          expect(scripts.length).to.equal(2);
          done();
        }, done);
    });

    it('should retrieve first script\'s name, body, and description by ID',
       (done) => {
         const { name, body, description } = this.scriptParams1;

         scriptsService.getScriptById({ id: this.scriptParams1.id })
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
         const { name, body, description } = this.scriptParams2;

         scriptsService.getScriptById({ id: this.scriptParams2.id })
           .then((script) => {
             const attributes = script.attributes;

             should.exist(script);
             expect(attributes.name).to.equal(name);
             expect(attributes.body).to.equal(body);
             expect(attributes.description).to.equal(description);
             done();
           }, done);
       });

    it('should update first script\'s name by ID', (done) => {
      const params = { id: this.scriptParams1.id };

      scriptsService.updateScriptById(params)
        .then(script => script.attributes.name)
        .then((name) => {
          expect(name).to.equal(params.name);
          done();
        }, done);
    });

    it('should update second script\'s description by ID', (done) => {
      const params = { id: this.scriptParams2.id };

      scriptsService.updateScriptById(params)
        .then(script => script.attributes.description)
        .then((description) => {
          expect(description).to.equal(params.description);
          done();
        }, done);
    });

    it('should delete both records by ID', (done) => {
      const params1 = { id: this.scriptParams1.id };
      const params2 = { id: this.scriptParams2.id };

      scriptsService.deleteScriptById(params1)
        .then((script) => {
          should.exist(script);
          expect(script.attributes).to.be.empty;
        }, done);

      scriptsService.deleteScriptById(params2)
        .then((script) => {
          should.exist(script);
          expect(script.attributes).to.be.empty;
          done();
        }, done);
    });
  });
});
