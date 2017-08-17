import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { setQuestionList, setCurrentQuestion, fetchAllQuestions } from '../../../public/src/actions/admin_questions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  all_campaigns: [],
  current_campaign: {}
};
// mock local storage
const localStorageMock = (() => {
  let localstore = {};
  return {
    getItem(key) {
      return localstore[key];
    },
    setItem(key, value) {
      localstore[key] = value.toString();
    },
    clear() {
      localstore = {};
    }
  };
})();

global.localStorage = localStorageMock;

let mock;

describe('question actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  function checkObjectProps(expectedProps, obj) {
    return expectedProps.reduce((accum, curr) => {
      const propertyExists = Object.prototype.hasOwnProperty.call(obj, curr);
      return accum && propertyExists;
    }, true);
  }

  const questionListFixtures = [
    { id: 4, title: 'Question', description: 'test question 1', type: 'singleselect', responses: 'no,yes,who cares,', created_at: '', updated_at: '' },
    { id: 3, title: 'Question 2', description: 'test question 2', type: 'paragraph', responses: '', created_at: '', updated_at: '' },
    { id: 2, title: 'Question 3', description: 'test question 3', type: 'multiselect', responses: 'meow,meow2', created_at: '', updated_at: '' },
    { id: 1, title: 'Question 4', description: 'test question 4', type: 'multiselect', responses: 'meow,meow', created_at: '', updated_at: '' }
  ];
  const questionFixture = {
    id: 1,
    title: 'meow questions',
    description: 'meow',
    type: 'multiselect',
    responses: 'meow,meow',
    created_at: '',
    updated_at: ''
  };
  const expectedQuestionProps = Object.keys(questionFixture);
  const numberOfProps = expectedQuestionProps.length;
  // left off

  describe('setQuestionList: ', () => {
    const setQuestionListResult = setQuestionList(questionListFixtures);
    describe('type: ', () => {
      const { type } = setQuestionListResult;
      it('should have a type property (not undefined): ', () => {
        expect(type).toBeDefined();
      });
      it('should have the type property "SET_CAMPAIGNS"', () => {
        expect(type).toEqual('SET_QUESTIONS');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = setQuestionListResult;
      it('should have a payload that is an array of objects: ', () => {
        expect(Array.isArray(payload)).toBe(true);
      });
      it('should contain 3 objects', () => {
        const firstObjectProps = checkObjectProps(expectedQuestionProps, payload[0]);
        const secondObjectProps = checkObjectProps(expectedQuestionProps, payload[1]);
        const thirdObjectProps = checkObjectProps(expectedQuestionProps, payload[2]);
        expect(payload.length).toBe(questionListFixtures.length);
        expect(thirdObjectProps && secondObjectProps && firstObjectProps).toBe(true);
      });
    });
  });

  describe('setCurrentQuestion', () => {
    const setCurrentQuestionResult = setCurrentQuestion(questionFixture);
    describe('type: ', () => {
      const { type } = setCurrentQuestionResult;
      it('should have a type property (not undefined): ', () => {
        expect(type).toBeDefined();
      });
      it('should have a value of "SET_QUESTION_CURRENT": ', () => {
        expect(type).toBe('SET_QUESTION_CURRENT');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = setCurrentQuestionResult;
      it('should have a payload that is an object: ', () => {
        expect(Array.isArray(payload)).toBe(false);
        expect(typeof payload).toBe('object');
      });
      it('should have all properties: ', () => {
        expect(checkObjectProps(expectedQuestionProps, payload)).toBe(true);
        expect(Object.keys(payload).length).toBe(numberOfProps);
      });
    });
  });

  describe('fetchAllQuestions: ', () => {
    mock = new MockAdapter(axios);

    beforeEach(() => {
      mock.onGet('/questions').reply(200, questionListFixtures
      );
    });
    afterEach(() => {
      mock.reset();
    });
    describe('axios GET request: ', () => {
      it('should add the appropriate action to the store: ', () => {
        const expectedAction = setQuestionList(questionListFixtures);
        return store.dispatch(fetchAllQuestions())
          .then(() => {
            const dispatchedActions = store.getActions();
            const { type, payload } = dispatchedActions[0];
            expect(dispatchedActions[0]).toEqual(expectedAction);
            expect(type).toBe('SET_QUESTIONS');
            expect(payload).toEqual(questionListFixtures);
          });
      });
    });
  });
});
