import { adminUsersReducer, SET_USERS, SET_USER_CURRENT } from '../../../public/src/reducers/admin_users';

import fixtures from '../client_fixtures';
import { checkObjectProps, isObjectEmpty } from '../client_test_helpers';

const { defaultUsers: initialState,
        listFixture: usersListFixture,
        mapFixture: userFixture } = fixtures.usersFixture;

const mockUserActions = [
  {
    type: SET_USERS,
    payload: usersListFixture
  },
  {
    type: SET_USER_CURRENT,
    payload: userFixture
  },
  {
    type: 'SET_CAMPAIGN_DATE',
    payload: 'this should not run'
  }
];

const [all, one, fake] = mockUserActions;
const numOfUsers = usersListFixture.length;
const expectedUserProps = Object.keys(userFixture);

describe('adminUsersReducer tests: ', () => {
  describe('default behavior: ', () => {
    const defaultState = adminUsersReducer(undefined, {});
    const { all_users, current_user } = defaultState;
    it('should return the default state if the action type does not match any cases: ', () => {
      expect(defaultState).toEqual(initialState);
    });
    it('should have a property named all_users which is an empty array: ', () => {
      expect(!!all_users).toBe(true);
      expect(Array.isArray(all_users)).toBe(true);
      expect(!!all_users.length).toBe(false);
    });
    it('shoudl have a property named current_user which is an empty object: ', () => {
      expect(typeof current_user).toBe('object');
      expect(!Array.isArray(current_user)).toBe(true);
      expect(isObjectEmpty(current_user)).toBe(true);
    });
  });

  describe('case matching and handling payload: ', () => {
    let testResult;
    describe('should add an array of users to all_users when "SET_USERS" is dispatched: ', () => {
      testResult = adminUsersReducer(initialState, all);
      const { all_users, current_user } = testResult;
      it('should update all_users to be an array of user objects: ', () => {
        expect(all_users.length).toBe(numOfUsers);
      });
      it('should not update current_user', () => {
        expect(isObjectEmpty(current_user)).toBe(true);
      });
    });
    describe('should add a user object to current_user when "SET_USER_CURRENT" is dispatched: ', () => {
      testResult = adminUsersReducer(initialState, one);
      const { all_users, current_user } = testResult;
      it('should udpate current user with a (non-empty) user object: ', () => {
        const { payload } = one;
        expect(current_user).toEqual(payload);
        expect(isObjectEmpty(current_user)).toBe(false);
      });
      it(`it should have the right properties: ${expectedUserProps.join(', ')}`, () => {
        expect(checkObjectProps(expectedUserProps, current_user)).toBe(true);
      });
      it('should not update all_users: ', () => {
        expect(isObjectEmpty(all_users)).toBe(true);
      });
    });

    describe('it should handle non-matching action types: ', () => {
      it('should return the default state if the action type is not a case in the reducer: ', () => {
        testResult = adminUsersReducer(initialState, fake);
        expect(testResult).toEqual(initialState);
      });
    });
  });
});
