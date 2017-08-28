import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { mockStore, exposeLocalStorageMock, checkObjectProps, isObjectEmpty } from '../client_test_helpers';
import fixtures from '../client_fixtures';
import { setCurrentUser, setUserList, fetchAllUsers, adminUpdateUserInfo } from '../../../public/src/actions/admin_users';

exposeLocalStorageMock();

const { defaultUsers: initialState,
        listFixture: usersListFixture,
        mapFixture: userFixture,
        updatedListFixture: usersUpdatedList } = fixtures.usersFixture;

describe('admin users list actions tests: ', () => {
  let mock;
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  const expectedUserProps = Object.keys(userFixture);
  const numberOfProps = expectedUserProps.length;

  describe('setUserList: ', () => {
    const setUserListResult = setUserList(usersListFixture);
    describe('type: ', () => {
      const { type } = setUserListResult;
      it('should have a type property (not undefined): ', () => {
        expect(type).toBeDefined();
      });
      it('should have the type property "SET_USERS"', () => {
        expect(type).toEqual('SET_USERS');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = setUserListResult;
      it('should have a payload that is an array of objects: ', () => {
        expect(Array.isArray(payload)).toBe(true);
      });
      it('should contain 3 objects', () => {
        const firstObjectProps = checkObjectProps(expectedUserProps, payload[0]);
        const secondObjectProps = checkObjectProps(expectedUserProps, payload[1]);
        const thirdObjectProps = checkObjectProps(expectedUserProps, payload[2]);
        expect(payload.length).toBe(3);
        expect(thirdObjectProps && secondObjectProps && firstObjectProps).toBe(true);
      });
    });
  });

  describe('setCurrentUser: ', () => {
    const setCurrentUserResult = setCurrentUser(userFixture);
    describe('type: ', () => {
      const { type } = setCurrentUserResult;
      it('should have a type property (not undefined): ', () => {
        expect(type).toBeDefined();
      });
      it('should have a value of "SET_USER_CURRENT": ', () => {
        expect(type).toBe('SET_USER_CURRENT');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = setCurrentUserResult;
      it('should have a payload that is an object: ', () => {
        expect(Array.isArray(payload)).toBe(false);
        expect(typeof payload).toBe('object');
      });
      it('should have all properties: ', () => {
        expect(checkObjectProps(expectedUserProps, payload)).toBe(true);
        expect(Object.keys(payload).length).toBe(numberOfProps);
      });
    });
  });

  describe('fetchAllUsers: ', () => {
    mock = new MockAdapter(axios);

    beforeEach(() => {
      mock.onGet('/users').reply(201, usersListFixture
      );
    });
    afterEach(() => {
      mock.reset();
    });
    describe('axios GET request: ', () => {
      it('should add the appropriate action to the store: ', () => {
        const currentUserId = 1;
        const filteredUsersList = usersListFixture.filter(userObj => userObj.id !== currentUserId);
        const expectedAction = setUserList(filteredUsersList);
        return store.dispatch(fetchAllUsers(currentUserId))
          .then(() => {
            const [dispatchedActions] = store.getActions();
            const { type, payload } = dispatchedActions;
            expect(dispatchedActions).toEqual(expectedAction);
            expect(type).toBe('SET_USERS');
            expect(payload).toEqual(filteredUsersList);
          })
          .catch((err) => {
            console.log('error with fetchAllUsers test: ', err);
          })
      });
    });
  });

  describe('adminUpdateUserInfo: ', () => {
    mock = new MockAdapter(axios);

    beforeEach(() => {
      mock.onPut('/users').reply(201, usersListFixture
      );
    });
    afterEach(() => {
      mock.reset();
    });
    describe('axios patch request: ', () => {
      it('should add the appropriate action to the store: ', () => {
        const currentUserId = 2;
        const updatedUsersList = usersUpdatedList.filter(userObj => userObj.id !== currentUserId);
        const expectedActionResult = setUserList(updatedUsersList);
        // the user that should have been modified
        const [andi] = usersListFixture;
        const { id } = andi;
        return store.dispatch(adminUpdateUserInfo())
          .then(() => {
            const [first, second] = store.getActions();
            console.log('should be fetchAllUsers: ', first, 'should be setall users: ', second);
            console.log('this is the expected action with the filtered list: ', expectedActionResult);
            //check payload and type of actions
          })
          .catch((err) => {
            console.log('error with update users request: ', err);
          });
      });
    });
  });
});
