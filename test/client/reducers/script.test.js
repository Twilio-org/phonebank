import { scriptQuestionsReducer, SET_SCRIPT_QUESTIONS } from '../../../public/src/reducers/script';
import fixtures from '../client_fixtures';

const { scriptQuestionsFixture } = fixtures.scriptViewFixtures;
const initialScriptQuestionState = [];

describe('scriptQuestionsReducer', () => {
  it('should return the initial state', () => {
    expect(scriptQuestionsReducer(undefined, {})).toEqual([]);
  });
  it('should react to an action with the type SET_SCRIPT_QUESTIONS', () => {
    expect(scriptQuestionsReducer(initialScriptQuestionState, {
      type: SET_SCRIPT_QUESTIONS,
      payload: scriptQuestionsFixture
    }).questions).toEqual(scriptQuestionsFixture);
  });
});
