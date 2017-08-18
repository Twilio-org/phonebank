import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockStore } from '../client_test_helpers';
import createQuestion from '../../../public/src/actions/questions';

describe('Questions actions', () => {
  const history = { goBack: jest.fn() }
  const question = {
    title: 'Hi',
    description: 'why',
    type: 'paragraph'
  };
  const question2 = {
    title: 'Hi',
    description: 'whaaat',
    type: 'multiselect',
    options: ['hi','no','yes','ok']
  }
  let mock;
  let store;
  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore();
  });
  describe('createQuestion ', () => {
    beforeEach(() => {
      mock.onPost('/questions').reply(201, question);
    });
    afterEach(() => {
      mock.reset();
    });
    describe('axios POST request: ', () => {
      it('should call history.goBack() on successful submit ', () => {
        return store.dispatch(createQuestion(question, history))
          .then((response) => {
            console.log('I dispatched!', response);
            expect(history.goBack).toBeCalled();
          });
      });
      it('should return 201 for status', () => {
        return store.dispatch(createQuestion(question, history))
          .then((response) => {
            expect(response.status).toBe(201);
          });
      });
      it('should return empty responses for question.type="paragraph"', () => {
        return store.dispatch(createQuestion(question, history))
          .then((response) => {
            expect(response.config.data).toContain('"responses":""');
          });
      });
      it('should return empty responses for question.type="paragraph"', () => {
        return store.dispatch(createQuestion(question2, history))
          .then((response) => {
            expect(response.config.data).toContain('"responses":"hi,no,yes,ok"');
          });
      });
      it('should return responses for question with options', () => {
        return store.dispatch(createQuestion(question2, history))
          .then((response) => {
            expect(response.config.data).toContain('"responses":"hi,no,yes,ok"');
          });
      });
    });
  });
});

// check that history.goBack was called
// check if status is 201

// const action = store.getActions()[0];
// console.log(store);
