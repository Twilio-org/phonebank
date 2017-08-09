import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import * as chai from 'chai';
import { test as testconfig } from '../../../knexfile';
import Question from '../../../server/db/services/questions';
import Model from '../../../server/db/models/questions';

const knex = knexModule(testconfig);
const bookshelf = bookshelfModule(knex);
const questionsModel = Model(bookshelf);

const expect = chai.expect;

describe('Question service tests', () => {
  before((done) => {
    bookshelf.knex.schema.hasTable('questions').then((exist) => {
      if (!exist) {
        bookshelf.knex.schema.createTable('questions', (table) => {
          table.increments('id').primary();
          table.string('title').notNullable().index();
          table.text('description').notNullable().index();
          table.enu('type', ['multiselect', 'singleselect', 'paragraph']).notNullable();
          table.text('responses').notNullable();
          table.timestamp('created_at').defaultTo(knex.fn.now());
          table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .then(() => {
          console.log('Created questions table!');
          done();
        })
        .catch(err => console.log('Error creating questions table', err));
      }
    });
  });

  after(() => {
    return bookshelf.knex.schema.dropTable('questions')
      .then((meow) => {
        console.log('Questions table dropped!');
      })
      .catch((err) => {
        console.log('Error dropping questions table: ', err);
      });
  });
  describe('Data insertion', function() {
    console.log('Now running questions service tests: ');
    beforeEach(() => {
      this.paramsArray = [
        {
          title: 'Testing Tables',
          description: 'Why do we like testing?',
          type: 'paragraph',
          responses: ''
        },
        {
          title: 'Still Testing Tables',
          description: 'What is your fav ice cream?',
          type: 'multiselect',
          responses: 'strawberry,oreo,tea'
        },
        {
          title: 'Still Testingggg Tablessss',
          description: 'Do you like sloths?',
          type: 'singleselect',
          responses: 'yes,no,sometimes'
        }
      ];
    });

    it('should be able to save question title, description, type, and responses options', (done) => {
      this.paramsArray.forEach((questionObj) => {
        Question.saveNewQuestion(questionObj, questionsModel)
          .then((question) => {
            expect(question.attributes.title).to.equal(questionObj.title);
            expect(question.attributes.description).to.equal(questionObj.description);
            expect(question.attributes.type).to.equal(questionObj.type);
            expect(question.attributes.responses).to.equal(questionObj.responses);
          })
          .catch((err) => {
            console.log('error with save question title, description, type, and responses options', err);
          });
      });
      done();
    });
  });

  describe('Data retrieval', function() {

    it('should retrieve all questions in the table', (done) => {
      Question.getAllQuestions(questionsModel)
        .then((questions) => {
          expect(questions.length).to.equal(3);
        })
        .catch((err) => {
            console.log('error with should retrieve all questions in the table', err);
        });
      done();
    });

    it('should return all questions in decending order from last update', (done) => {
      Question.getAllQuestions(questionsModel)
        .then((questions) => {
          const { models } = questions;
          expect(models[0].attributes.title).to.equal('Still Testingggg Tablessss');
          expect(models[2].attributes.title).to.equal('Testing Tables');
        })
        .catch((err) => {
            console.log('error with return all questions in decending order from last update', err);
        });
      done();
    });

    it('should retrieve a question by id', (done) => {
      Question.getQuestionById({ id: 1 }, questionsModel)
        .then((question) => {
          expect(question.attributes.title).to.equal('Testing Tables');
        })
        .catch((err) => {
            console.log('error with should retrieve a question by id', err);
        });

      Question.getQuestionById({ id: 2 }, questionsModel)
        .then((question) => {
          expect(question.attributes.title).to.equal('Still Testing Tables');
        })
        .catch((err) => {
            console.log('error with should retrieve a question by id', err);
        });

      Question.getQuestionById({ id: 3 }, questionsModel)
        .then((question) => {
          expect(question.attributes.title).to.equal('Still Testingggg Tablessss');
        })
        .catch((err) => {
            console.log('error with should retrieve a question by id', err);
        });
      done();
    });
  });
});
