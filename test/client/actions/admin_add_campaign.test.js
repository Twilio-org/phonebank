import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { mockStore, exposeLocalStorageMock, checkObjectProps } from '../client_test_helpers';
import { setScriptOptions, setContactListOptions, fetchAllScripts, fetchAllContactLists } from '../../../public/src/actions/campaign_form';
import fixtures from '../client_fixtures';

exposeLocalStorageMock();

const { defaultScriptsContactsForm: initialState } = fixtures.campaignFixtures; 
const { listFixture: scriptListFixtures,
        mapFixture: scriptFixture } = fixtures.scriptFixtures;
const { listFixture: contactListFixtures,
        mapFixture: contactListFixture } = fixtures.contactListFixtures;

describe('Add Campaign actions', () => {
  let mock;
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  const expectedScriptProps = Object.keys(scriptFixture);
  const expectedContactListProps = Object.keys(contactListFixture);

  describe('setScriptOptions: ', () => {
    const { type, payload } = setScriptOptions(scriptListFixtures);
    describe('type ', () => {
      it('should have the correct type property ', () => {
        expect(type).toBeDefined();
        expect(type).toEqual('SET_CAMPAIGN_FORM_SCRIPT');
      });
    });
    describe('payload', () => {
      it('should be an array ', () => {
        expect(Array.isArray(payload)).toBe(true);
      });
      it('the array should have 3 entries ', () => {
        const firstObjectProps = checkObjectProps(expectedScriptProps, payload[0]);
        const secondObjectProps = checkObjectProps(expectedScriptProps, payload[1]);
        const thirdObjectProps = checkObjectProps(expectedScriptProps, payload[2]);
        expect(payload.length).toBe(3);
        expect(thirdObjectProps && secondObjectProps && firstObjectProps).toBe(true);
      });
    });
  });

  describe('setContactListOptions: ', () => {
    const { type, payload } = setContactListOptions(contactListFixtures);
    describe('type ', () => {
      it('should have the correct type property ', () => {
        expect(type).toBeDefined();
        expect(type).toEqual('SET_CAMPAIGN_FORM_CONTACT_LIST');
      });
    });
    describe('payload', () => {
      it('should be an array ', () => {
        expect(Array.isArray(payload)).toBe(true);
      });
      it('the array should have 3 entries ', () => {
        const firstObjectProps = checkObjectProps(expectedContactListProps, payload[0]);
        const secondObjectProps = checkObjectProps(expectedContactListProps, payload[1]);
        const thirdObjectProps = checkObjectProps(expectedContactListProps, payload[2]);
        expect(payload.length).toBe(3);
        expect(thirdObjectProps && secondObjectProps && firstObjectProps).toBe(true);
      });
    });
  });

  describe('fetchAllScripts: ', () => {
    mock = new MockAdapter(axios);
    beforeEach(() => {
      mock.onGet('/scripts').reply(200, scriptListFixtures);
    });

    afterEach(() => {
      mock.reset();
    });
    describe('axios GET requests: ', () => {
      it('should add the appropriate action to the store: ', () => {
        const expectedAction = setScriptOptions(scriptListFixtures);
        return store.dispatch(fetchAllScripts())
          .then(() => {
            const dispatchedActions = store.getActions();
            const { type, payload } = dispatchedActions[0];
            expect(dispatchedActions[0]).toEqual(expectedAction);
            expect(type).toBe('SET_CAMPAIGN_FORM_SCRIPT');
            expect(payload).toEqual(scriptListFixtures);
          });
      });
    });
  });

  describe('fetchAllContactLists: ', () => {
    mock = new MockAdapter(axios);
    beforeEach(() => {
      mock.onGet('/contactLists').reply(200, contactListFixtures);
    });

    afterEach(() => {
      mock.reset();
    });
    describe('axios GET requests: ', () => {
      it('should add the appropriate action to the store: ', () => {
        const expectedAction = setContactListOptions(contactListFixtures);
        return store.dispatch(fetchAllContactLists())
          .then(() => {
            const dispatchedActions = store.getActions();
            const { type, payload } = dispatchedActions[0];
            expect(dispatchedActions[0]).toEqual(expectedAction);
            expect(type).toBe('SET_CAMPAIGN_FORM_CONTACT_LIST');
            expect(payload).toEqual(contactListFixtures);
          });
      });
    });
  });
});
