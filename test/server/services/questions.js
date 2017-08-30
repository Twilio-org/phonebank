import * as chai from 'chai';
import cleanUp from '../bootstrap';
import Question from '../../../server/db/services/questions';

const expect = chai.expect;

describe('Question service tests', () => {
  after((done) => {
    cleanUp(done);
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
        Question.saveNewQuestion(questionObj)
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
      Question.getAllQuestions()
        .then((questions) => {
          expect(questions.length).to.equal(3);
        })
        .catch((err) => {
            console.log('error with should retrieve all questions in the table', err);
        });
      done();
    });

    it('should return all questions in decending order from last update', (done) => {
      Question.getAllQuestions()
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
      Question.getQuestionById({ id: 1 })
        .then((question) => {
          expect(question.attributes.title).to.equal('Testing Tables');
        })
        .catch((err) => {
            console.log('error with should retrieve a question by id', err);
        });

      Question.getQuestionById({ id: 2 })
        .then((question) => {
          expect(question.attributes.title).to.equal('Still Testing Tables');
        })
        .catch((err) => {
            console.log('error with should retrieve a question by id', err);
        });

      Question.getQuestionById({ id: 3 })
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
