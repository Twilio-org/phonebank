import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { destroy } from 'redux-form';
import fixtures from '../client_fixtures';
import { checkObjectProps, exposeLocalStorageMock, mockStore } from '../client_test_helpers';
import { fetchAllScripts,
         postScript,
         setCurrentScript,
         setScriptsList,
         setScriptQuestions } from '../../../public/src/actions/admin_scripts';

exposeLocalStorageMock();

const { defaultScripts: initialState,
        listFixture: scriptListFixtures,
        mapFixture: scriptFixture,
        sortedListFixture: scriptSortedListFixture } = fixtures.scriptFixtures;

const { listFixture: questionListFixtures,
        mapFixture: questionFixture } = fixtures.questionFixtures;

describe('script actions', () => {
  let mock;
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  const expectedScriptProps = Object.keys(scriptFixture);
  const expectedQuestionProps = Object.keys(questionFixture);
  const numberOfScriptProps = expectedScriptProps.length;
  const numberOfQuestionProps = expectedQuestionProps.length;

  describe('setScriptList: ', () => {
    const setScriptListResult = setScriptsList(scriptListFixtures);

    describe('type: ', () => {
      const { type } = setScriptListResult;
      it('should have a type property (not undefined): ', () => {
        expect(type).toBeDefined();
      });
      it('should have the type property "SET_SCRIPTS"', () => {
        expect(type).toEqual('SET_SCRIPTS');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });

    describe('payload: ', () => {
      const { payload } = setScriptListResult;

      it('should have a payload that is an array of objects: ', () => {
        expect(Array.isArray(payload)).toBe(true);
      });
      it('should contain 3 objects', () => {
        const firstObjectProps = checkObjectProps(expectedScriptProps, payload[0]);
        const secondObjectProps = checkObjectProps(expectedScriptProps, payload[1]);
        const thirdObjectProps = checkObjectProps(expectedScriptProps, payload[2]);

        expect(payload.length).toBe(scriptListFixtures.length);
        expect(thirdObjectProps && secondObjectProps && firstObjectProps).toBe(true);
      });
    });
  });

  describe('setCurrentScript', () => {
    const setCurrentScriptResult = setCurrentScript(scriptFixture);

    describe('type: ', () => {
      const { type } = setCurrentScriptResult;

      it('should have a type property (not undefined): ', () => {
        expect(type).toBeDefined();
      });
      it('should have a value of "SET_SCRIPT_CURRENT": ', () => {
        expect(type).toBe('SET_SCRIPT_CURRENT');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });

    describe('payload: ', () => {
      const { payload } = setCurrentScriptResult;
      it('should have a payload that is an object: ', () => {
        expect(Array.isArray(payload)).toBe(false);
        expect(typeof payload).toBe('object');
      });
      it('should have all properties: ', () => {
        expect(checkObjectProps(expectedScriptProps, payload)).toBe(true);
        expect(Object.keys(payload).length).toBe(numberOfScriptProps);
      });
    });
  });

  describe('fetchAllScripts: ', () => {
    mock = new MockAdapter(axios);

    beforeEach(() => {
      mock.onGet('/scripts').reply(200, scriptListFixtures
      );
    });

    afterEach(() => {
      mock.reset();
    });

    describe('axios GET request: ', () => {
      it('should add the appropriate action to the store: ', () => {
        const { type, payload } = setScriptsList(scriptSortedListFixture);

        return store.dispatch(fetchAllScripts())
          .then(() => {
            const dispatchedActions = store.getActions();
            expect(dispatchedActions[0].type).toEqual(type);
            expect(dispatchedActions[0].payload).toEqual(payload);
          });
      });
    });
  });

  describe('setScriptQuestions: ', () => {
    const setScriptQuestionsResult = setScriptQuestions(questionListFixtures);

    describe('type: ', () => {
      const { type } = setScriptQuestionsResult;

      it('should have the type property "SET_SCRIPT_QUESTIONS"', () => {
        expect(type).toEqual('SET_SCRIPT_QUESTIONS');
      });
    });

    describe('payload: ', () => {
      const { payload } = setScriptQuestionsResult;

      it('should have a payload that is an array of objects: ', () => {
        expect(Array.isArray(payload)).toBe(true);
      });

      it('should contain 4 objects', () => {
        const firstObjectProps = checkObjectProps(expectedQuestionProps, payload[0]);
        const secondObjectProps = checkObjectProps(expectedQuestionProps, payload[1]);
        const thirdObjectProps = checkObjectProps(expectedQuestionProps, payload[2]);
        const fourthObjectProps = checkObjectProps(expectedQuestionProps, payload[3]);
        const questionListFixtureCount = questionListFixtures.length;

        expect(payload.length).toBe(questionListFixtureCount);
        expect(payload.reduce((sum, question) => sum + Object.keys(question).length, 0))
          .toBe(numberOfQuestionProps * questionListFixtureCount);
        expect(thirdObjectProps &&
               secondObjectProps &&
               firstObjectProps &&
               fourthObjectProps).toBe(true);
      });
    });
  });

  describe('postScript: ', () => {
    mock = new MockAdapter(axios);

    beforeEach(() => {
      mock.onPost('/scripts').reply(200, scriptFixture);
    });

    afterEach(() => {
      mock.reset();
    });

    describe('axios POST request: ', () => {
      it('should add the destory action to the store and call goBack from history: ', () => {
        const { body, description, name } = scriptFixture;
        const script = { body, description, name };
        const expectedDestroyAction = destroy('ScriptForm');
        const history = { goBack: jest.fn() };

        return store.dispatch(postScript(script, questionListFixtures, history))
          .then(() => {
            const dispatchedActions = store.getActions();
            const { type, meta } = dispatchedActions[0];

            expect(dispatchedActions[0]).toEqual(expectedDestroyAction);
            expect(history.goBack).toHaveBeenCalled();
          });
      });
    });
  });
});
