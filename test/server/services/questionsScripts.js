/* eslint-disable jest/valid-expect */

import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import { expect } from 'chai';
import { test as testconfig } from '../../../knexfile';
import scriptsService from '../../../server/db/services/scripts';
import questionsService from '../../../server/db/services/questions';
import Script from '../../../server/db/models/scripts';
import Question from '../../../server/db/models/questions';

const knex = knexModule(testconfig);
const bookshelf = bookshelfModule(knex);
const ScriptsModel = Script(bookshelf);
const QuestionsModel = Question(bookshelf);

describe('questions_scripts services from scripts', function() {
  before((done) => {
    function makeScriptsTable() {
      return bookshelf.knex.schema.hasTable('scripts').then((exist) => {
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
          }).catch(err => console.log(err));
        }
      });
    }

    function makeQuestionsTable() {
      return bookshelf.knex.schema.hasTable('questions').then((exist) => {
        if (!exist) {
          bookshelf.knex.schema.createTable('questions', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable().index();
            table.text('description').notNullable().index();
            table.enu('type', ['multiselect', 'singleselect', 'paragraph'])
            .notNullable();
            table.text('responses').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
          })
          .then(() => {
            console.log('Created questions table!');
          })
          .catch(err => console.log('Error creating questions table', err));
        }
      });
    }

    function makeQuestionsScripts() {
      return bookshelf.knex.schema.hasTable('questions_scripts').then((exist) => {
        if (!exist) {
          bookshelf.knex.schema.createTable('questions_scripts', (table) => {
            table.increments('id').primary();
            table.integer('script_id').references('scripts.id').notNullable();
            table.integer('question_id').references('questions.id')
              .notNullable();
            table.integer('sequence_number').notNullable();
            table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
            table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
          }).then((table) => {
            console.log('Created scripts_to_questions table');
            return table;
          }).catch(err =>
            console.log('Error creating scripts_to_questions table', err));
        }
      });
    }

    const scriptParams = {
      name: 'Script Name 1',
      body: 'Script Body 1',
      description: 'Script Description 1'
    };

    const questionParams = {
      title: 'Testing Tables',
      description: 'Test description',
      type: 'paragraph',
      responses: 'resp1,resp2,resp3'
    };

    makeScriptsTable().then(() => {
      makeQuestionsTable().then(() => {
        scriptsService.saveNewScript(scriptParams, ScriptsModel)
        .then(() => {
          questionsService.saveNewQuestion(questionParams, QuestionsModel)
          .then(() => {
            makeQuestionsScripts().then(() => {
              done();
            });
          });
        });
      });
    });
  });

  after((done) => {
    bookshelf.knex.schema.dropTable('questions_scripts').then(() => {
      bookshelf.knex.schema.dropTable('scripts').then(() => {
        bookshelf.knex.schema.dropTable('questions').then(() => {
          done();
        });
      });
    });
  });

  describe('Creates Join Entries', function() {
    before((done) => {
      let script_id;
      let question_id;

      scriptsService.getAllScripts(ScriptsModel)
        .then((fetchedScripts) => {
          script_id = fetchedScripts.models[0].id;
          // console.log('////////////////////////// SCRIPT ID: ', script_id)

          questionsService.getAllQuestions(QuestionsModel)
            .then((fetchedQuestions) => {
              question_id = fetchedQuestions.models[0].id;
              // console.log('////////////////////////// QUESTION ID: ', question_id)

              this.questionScriptParams = {
                id: script_id.toString(),
                question_id: question_id.toString(),
                sequence_number: '1'
              };
              done();
            });
        });
    });

    it('Saves the join-entry\'s script id', (done) => {
      const params = this.questionScriptParams;
      const { id } = params;
      console.log('////////////////////////// PARAMS: ', params)

      scriptsService.addQuestionToScript(params, ScriptsModel)
        .then((scriptQuestion) => {
          expect(scriptQuestion.models[0].attributes.script_id).to.equal(id);
          done();
        }, done);
    });

    it('Saves the join-entry\'s question id', (done) => {
      const params = this.questionScriptParams;
      const { question_id } = params;

      scriptsService.addQuestionToScript(params, ScriptsModel)
        .then((scriptQuestion) => {
          expect(scriptQuestion.models[0].attributes.question_id)
            .to.equal(question_id);
          done();
        }, done);
    });

    it('Saves the join-entry\'s sequence number', (done) => {
      const params = this.questionScriptParams;
      const { sequence_number } = params;

      scriptsService.addQuestionToScript(params, ScriptsModel)
        .then((scriptQuestion) => {
          expect(scriptQuestion.models[0].attributes.sequence_number)
            .to.equal(sequence_number);
          done();
        }, done);
    });

    it('the saved join-entry only has 3 attributes after saving', (done) => {
      scriptsService.addQuestionToScript(this.questionScriptParams,
        ScriptsModel).then((scriptQuestion) => {
          const scriptQuestionProps = Object.keys(scriptQuestion.models[0].attributes);

          expect(scriptQuestionProps.length).to.equal(3);
          done();
        }, done);
    });
  });

  describe('Data retrieval', function() {
    beforeEach((done) => {
      this.questionScriptParams = {
        id: '1',
        question_id: '1',
        sequence_number: '1'
      };
      const params = this.questionScriptParams;

      scriptsService.addQuestionToScript(params, ScriptsModel)
        .then(() => done());
    });

    it('should return all questions for a script', (done) => {
      const params = this.questionScriptParams;

      scriptsService.getQuestionsByScriptId(params, ScriptsModel)
        .then((questions) => {
          console.log(questions);
          done();
        }, done);
    });
  });
});
