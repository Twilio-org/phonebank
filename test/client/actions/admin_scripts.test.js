import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { mockStore, exposeLocalStorageMock, checkObjectProps } from '../client_test_helpers';
import { setScriptsList, setCurrentScript, fetchAllScripts } from '../../../public/src/actions/admin_scripts';
import fixtures from '../client_fixtures';

// localStorage:
exposeLocalStorageMock();

// scriptFixtures:
const { defaultScripts: initialState,
        listFixture: scriptListFixtures,
        mapFixture: scriptFixture } = fixtures.scriptFixtures;

describe('script actions', () => {
  let mock;
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  const expectedScriptProps = Object.keys(scriptFixture);
  const numberOfProps = expectedScriptProps.length;

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
        expect(Object.keys(payload).length).toBe(numberOfProps);
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
        const expectedAction = setScriptsList(scriptListFixtures);
        return store.dispatch(fetchAllScripts())
          .then(() => {
            const dispatchedActions = store.getActions();
            const { type, payload } = dispatchedActions[0];
            expect(dispatchedActions[0]).toEqual(expectedAction);
            expect(type).toBe('SET_SCRIPTS');
            expect(payload).toEqual(scriptListFixtures);
          });
      });
    });
  });
});
