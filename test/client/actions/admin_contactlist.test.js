import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { mockStore, exposeLocalStorageMock, checkObjectProps } from '../client_test_helpers';
import { setContactListOptions, fetchAllContactLists, setCurrentContactList, createContactList } from '../../../public/src/actions/admin_contact_lists';
import fixtures from '../client_fixtures';

exposeLocalStorageMock();

const { defaultScriptsContactsForm: initialState } = fixtures.campaignFixtures;
const { listFixture: contactListFixtures,
        mapFixture: contactListFixture,
        sortedListFixture: contactListSortedFixtures } = fixtures.contactListFixtures;
const history = { goBack: jest.fn() };
const fileList = {
  files: [{
    name: "test.csv",
    size: 500001,
    type: "text/csv"
  }]
};
const fileName = 'Test file';

describe('Add Campaign actions', () => {
  let mock;
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  const expectedContactListProps = Object.keys(contactListFixture);

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

  describe('setCurrentContactList', () => {
    const { type, payload } = setCurrentContactList(contactListFixture);
    describe('type', () => {
      it('should have a type property', () => {
        expect(type).toBeDefined();
      });
      it('should not have a null type', () => {
        expect(type).not.toBe(null);
      });
      it('should have a value of "SET_CURRENT_CONTACT_LIST"', () => {
        expect(type).toBe('SET_CURRENT_CONTACT_LIST');
      });
    });
    describe('payload:', () => {
      it('should have a payload that is an object', () => {
        expect(Array.isArray(payload)).toBe(false);
        expect(typeof payload).toBe('object');
      });
      it('should have all properties:', () => {
        expect(checkObjectProps(expectedContactListProps, payload)).toBe(true);
        expect(Object.keys(payload).length).toBe(expectedContactListProps.length);
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
        const { type, payload } = setContactListOptions(contactListSortedFixtures);
        return store.dispatch(fetchAllContactLists())
          .then(() => {
            const dispatchedActions = store.getActions();
            expect(dispatchedActions[0].type).toEqual(type);
            expect(dispatchedActions[0].payload).toEqual(payload);
          });
      });
    });
  });

  describe('createQuestion ', () => {
    beforeEach(() => {
      let contactList = new FormData();
      contactList.append('csv', fileList[0]);
      contactList.append('name', fileName);
      mock.onPost('/contactLists').reply(201, contactList);
    });
    afterEach(() => {
      mock.reset();
    });
    describe('axios POST request: ', () => {
      it('should call history.goBack() on successful submit ', () => {
        return store.dispatch(createContactList(fileList, fileName, history))
          .then((response) => {
            expect(history.goBack).toBeCalled();
          });
      });
      it('should dispatch SEND_CONTACT_LIST ', () => {
        return store.dispatch(createContactList(fileList, fileName, history))
          .then((response) => {
            expect(store.getActions()[0].type).toBe('SEND_CONTACT_LIST');
          });
      });
      it('should return 201 for status', () => {
        return store.dispatch(createContactList(fileList, fileName, history))
          .then((response) => {
            expect(response.status).toBe(201);
          });
      });
    });
  });
});
