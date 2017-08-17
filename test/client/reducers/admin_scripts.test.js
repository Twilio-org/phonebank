import { SET_SCRIPTS, SET_SCRIPT_CURRENT, adminScriptsReducer } from '../../../public/src/reducers/admin_scripts';

import fixtures from '../client_fixtures';
import { checkObjectProps, isObjectEmpty } from '../client_test_helpers';

// scriptFixtures:
const { defaultScripts: initialState,
        listFixture: scriptListFixtures,
        mapFixture: scriptFixture } = fixtures.scriptFixtures;

const mockScriptActions = [
  {
    type: SET_SCRIPTS,
    payload: scriptListFixtures
  },
  {
    type: SET_SCRIPT_CURRENT,
    payload: scriptFixture
  },
  {
    type: 'SET_SCRIPT_DATE',
    payload: 'you have been fooled'
  }
];
const [all, one, fake] = mockScriptActions;
const numOfScripts = scriptListFixtures.length;
const expectedScriptProps = Object.keys(scriptFixture);

describe('script list view reducer tests: ', () => {
  let testResult;
  describe('default behavior', () => {
    const defaultState = adminScriptsReducer(undefined, {});
    const { all_scripts, current_script } = defaultState;
    it('should return the default state if the action type does not match any cases: ', () => {
      expect(defaultState).toEqual(initialState);
    });
    it('should have a property named all_scripts which is an empty array: ', () => {
      expect(!!all_scripts).toBe(true);
      expect(Array.isArray(all_scripts)).toBe(true);
      expect(!!all_scripts.length).toBe(false);
    });
    it('should have a property named current_script which is an empty object: ', () => {
      expect(!!all_scripts).toBe(true);
      expect(typeof current_script).toBe('object');
      expect(!Array.isArray(current_script)).toBe(true);
      expect(isObjectEmpty(current_script)).toBe(true);
    });
  });
  describe('it should add an array of all scripts when "SET_SCRIPTS" is called', () => {
    testResult = adminScriptsReducer(initialState, all);
    const { current_script, all_scripts } = testResult;
    it('should update all_scripts to be an array of script objects', () => {
      expect(Array.isArray(all_scripts)).toBe(true);
      expect(all_scripts.length).toBe(numOfScripts);
    });
    it('should not update current_script', () => {
      expect(isObjectEmpty(current_script)).toBe(true);
    });
  });
  describe('it should add a script object to current_script when "SET_SCRIPT_CURRENT" is dispatched: ', () => {
    testResult = adminScriptsReducer(initialState, one);
    const { current_script, all_scripts } = testResult;
    it('should update current_script when "SET_SCRIPT_CURRENT" is dispatched ', () => {
      expect(current_script).toEqual(scriptFixture);
      expect(!!Object.keys(current_script).length).toBe(true);
    });
    it(`Should have the following props: ${expectedScriptProps.join(', ')}`, () => {
      expect(checkObjectProps(expectedScriptProps, current_script)).toBe(true);
    });
    it('should not update all_scripts ', () => {
      expect(isObjectEmpty(all_scripts)).toBe(true);
    });
  });
  describe('handling non-matching action types: ', () => {
    testResult = adminScriptsReducer(initialState, fake);
    const { current_script, all_scripts } = testResult;
    it('should neither update current_script, nor all_scripts: ', () => {
      const shouldBeTrue = [current_script, all_scripts]
        .reduce((accum, curr) => accum && isObjectEmpty(curr), true);
      expect(shouldBeTrue).toBe(true);
    });
  });
});
