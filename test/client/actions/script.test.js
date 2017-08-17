import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setScriptInfo, setScriptQuestions, fetchScript, fetchScriptQuestions } from '../../../public/src/actions/script';
import { SET_SCRIPT_INFO, SET_SCRIPT_QUESTIONS } from '../../../public/src/reducers/script';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  name: null,
  body: null,
  description: null
};

const newScript = {
  id: 1,
  name: 'ScriptName',
  body: 'ScriptBody',
  description: 'ScriptDescription',
  created_at: '2017-08-11T21:36:45.366Z',
  updated_at: '2017-08-11T21:36:45.366Z'
};

const scriptQuestions = [
  {
    id: 4,
    title: 'Age',
    description: 'What is your age range?',
    type: 'singleselect',
    responses: '0-10,11-20,21-40,41-60,61+',
    created_at: '2017-08-11T21:36:45.387Z',
    updated_at: '2017-08-11T21:36:45.387Z',
    script_id: 1,
    question_id: 3,
    sequence_number: 1
  },
  {
    id: 5,
    title: 'Hobbies',
    description: 'What are your hobbies?',
    type: 'multiselect',
    responses: 'swimming,running,biking,sleeping,eating,weaving',
    created_at: '2017-08-11T21:36:45.398Z',
    updated_at: '2017-08-11T21:36:45.398Z',
    script_id: 1,
    question_id: 2,
    sequence_number: 2
  },
  {
    id: 6,
    title: 'Ice Cream',
    description: 'How do you feel about ice cream?',
    type: 'paragraph',
    responses: null,
    created_at: '2017-08-11T21:36:45.514Z',
    updated_at: '2017-08-11T21:36:45.514Z',
    script_id: 1,
    question_id: 1,
    sequence_number: 3
  }
];
let mock;
let store;

function checkObjectProps(expectedProps, obj) {
  return expectedProps.reduce((accum, curr) => {
    const propertyExists = Object.prototype.hasOwnProperty.call(obj, curr);
    return accum && propertyExists;
  }, true);
}

describe('script actions', () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore(initialState);
  });
  afterEach(() => {
    mock.reset();
  });
  describe('setScriptInfo', () => {
    const { type, payload } = setScriptInfo(newScript);
    describe('type', () => {
      it('should have the type "SET_SCRIPT_INFO"', () => {
        expect(type).toEqual('SET_SCRIPT_INFO');
      });
    });
    describe('payload', () => {
      it('should pass on the payload we pass in', () => {
        const newScriptKeys = Object.keys(newScript);
        const payloadKeys = Object.keys(payload);
        const scriptPropsAreCorrect = checkObjectProps(newScriptKeys, payload);
        expect(payloadKeys.length).toBe(6);
        expect(scriptPropsAreCorrect).toBe(true);
      });
    });
  });
  describe('setScriptQuestions', () => {
    const { type, payload } = setScriptQuestions(scriptQuestions);
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
        const scriptQuestionKeys = Object.keys(scriptQuestions[0]);
        const questionPropsAreCorrect = checkObjectProps(scriptQuestionKeys, payload[0]);
        expect(payload).toEqual(scriptQuestions);
        expect(questionPropsAreCorrect).toBe(true);
      });
    });
  });
  describe('fetchScript', () => {
    beforeEach(() => {
      mock.onGet('/scripts/1').reply(200, newScript);
    });
    it('should add expected action to the store', () => {
      const expectedAction = { type: SET_SCRIPT_INFO, payload: newScript };
      return store.dispatch(fetchScript(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedAction);
          expect(actions[0].payload).toEqual(newScript);
        });
    });
  });
  describe('fetchScriptQuestions', () => {
    beforeEach(() => {
      mock.onGet('/scripts/1/scriptQuestions/').reply(200, scriptQuestions);
    });
    it('should add expected action to the store', () => {
      const expectedAction = { type: SET_SCRIPT_QUESTIONS, payload: scriptQuestions };
      return store.dispatch(fetchScriptQuestions(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedAction);
          expect(actions[0].payload).toEqual(scriptQuestions);
        });
    });
  });
});
