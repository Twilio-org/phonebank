import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { mockStore, exposeLocalStorageMock, checkObjectProps } from '../client_test_helpers';
import { setQuestionList, setCurrentQuestion, fetchAllQuestions } from '../../../public/src/actions/admin_questions';
import fixtures from '../client_fixtures';

exposeLocalStorageMock();

const { defaultScripts: initialState,
        listFixture: questionListFixtures,
        mapFixture: questionFixture } = fixtures.questionFixtures;

describe('question actions', () => {
  let mock;
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  const expectedQuestionProps = Object.keys(questionFixture);
  const numberOfProps = expectedQuestionProps.length;

  describe('setQuestionList: ', () => {
    const setQuestionListResult = setQuestionList(questionListFixtures);
    describe('type: ', () => {
      const { type } = setQuestionListResult;
      it('should have a type property (not undefined): ', () => {
        expect(type).toBeDefined();
      });
      it('should have the type property "SET_QUESTIONS"', () => {
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
