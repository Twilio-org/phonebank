import { adminScriptsReducer, SET_SCRIPT_QUESTIONS } from '../../../public/src/reducers/admin_scripts';
import fixtures from '../client_fixtures';

const { scriptQuestionsFixture } = fixtures.scriptViewFixtures;
const { defaultScripts: initialState } = fixtures.scriptFixtures;

describe('adminScriptsReducer', () => {
  it('should return the initial state', () => {
    expect(adminScriptsReducer(undefined, {})).toEqual(initialState);
  });
  it('should react to an action with the type SET_SCRIPT_QUESTIONS', () => {
    expect(adminScriptsReducer(undefined, {
      type: SET_SCRIPT_QUESTIONS,
      payload: scriptQuestionsFixture
    }).script_questions).toEqual(scriptQuestionsFixture);
  });
});
