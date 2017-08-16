import { scriptInfoReducer, scriptQuestionsReducer, SET_SCRIPT_INFO, SET_SCRIPT_QUESTIONS } from '../../../public/src/reducers/script';

const initialScriptState = {
  name: null,
  body: null,
  description: null
};

const initialScriptQuestionState = [];

const newScript = {
  name: 'ScriptName',
  body: 'ScriptBody',
  description: 'ScriptDescription'
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

describe('scriptInfoReducer', () => {
  it('should return the initial state', () => {
    expect(scriptInfoReducer(undefined, {})).toEqual({
      name: null,
      body: null,
      description: null
    });
  });
  it('should react to an action with the type SET_SCRIPT_INFO', () => {
    expect(scriptInfoReducer(initialScriptState, {
      type: SET_SCRIPT_INFO,
      payload: newScript
    })).toEqual(newScript);
  });
});
describe('scriptQuestionsReducer', () => {
  it('should return the initial state', () => {
    expect(scriptQuestionsReducer(undefined, {})).toEqual([]);
  });
  it('should react to an action with the type SET_SCRIPT_QUESTIONS', () => {
    expect(scriptQuestionsReducer(initialScriptQuestionState, {
      type: SET_SCRIPT_QUESTIONS,
      payload: scriptQuestions
    }).questions).toEqual(scriptQuestions);
  });
});
