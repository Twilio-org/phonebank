import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { checkObjectProps, mockStore } from '../client_test_helpers';
import { setCurrentScript, fetchScript, fetchScriptQuestions, setScriptQuestions } from '../../../public/src/actions/admin_scripts';
import fixtures from '../client_fixtures';

const { defaultScript, scriptFixture, scriptQuestionsFixture } = fixtures.scriptViewFixtures;

let mock;
let store;

describe('script actions', () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore(defaultScript);
  });
  afterEach(() => {
    mock.reset();
  });
  describe('setScriptQuestions', () => {
    const { type, payload } = setScriptQuestions(scriptQuestionsFixture);
    describe('type', () => {
      it('should have the type "SET_SCRIPT_QUESTIONS"', () => {
        expect(type).toEqual('SET_SCRIPT_QUESTIONS');
      });
    });
    describe('payload', () => {
      it('should be an array of objects', () => {
        expect(Array.isArray(payload)).toBe(true);
      });
      it('should pass on the payload we pass in', () => {
        const scriptQuestionKeys = Object.keys(scriptQuestionsFixture[0]);
        const questionPropsAreCorrect = checkObjectProps(scriptQuestionKeys, payload[0]);
        expect(payload).toEqual(scriptQuestionsFixture);
        expect(questionPropsAreCorrect).toBe(true);
      });
    });
  });
  describe('fetchScript', () => {
    beforeEach(() => {
      mock.onGet('/scripts/1').reply(200, scriptFixture);
    });
    it('should add expected action to the store', () => {
      const expectedAction = setCurrentScript(scriptFixture);
      return store.dispatch(fetchScript(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedAction);
          expect(actions[0].payload).toEqual(scriptFixture);
        });
    });
  });
  describe('fetchScriptQuestions', () => {
    beforeEach(() => {
      mock.onGet('/scripts/1/scriptQuestions/').reply(200, scriptQuestionsFixture);
    });
    it('should add expected action to the store', () => {
      const expectedAction = setScriptQuestions(scriptQuestionsFixture);
      return store.dispatch(fetchScriptQuestions(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedAction);
          expect(actions[0].payload).toEqual(scriptQuestionsFixture);
        });
    });
  });
});
