import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setAccountInfo, fetchUser } from '../../../public/src/actions/account_info';
import { SET_USER_ACCOUNT_INFO } from '../../../public/src/reducers/account_info';
import { mockStore, exposeLocalStorageMock } from '../client_test_helpers';

const initialState = {
  first_name: null,
  last_name: null,
  email: null,
  phone_number: null
};

exposeLocalStorageMock();

const user = {
  first_name: 'Oscar',
  last_name: 'Grouch',
  email: 'oscar@g.com',
  phone_number: '15555555555'
};

let mock;

describe('accountInfoActions', () => {
  const store = mockStore(initialState);
  describe('setAccountInfoAction', () => {
    it('should have a type of "SET_USER_ACCOUNT_INFO"', () => {
      expect(setAccountInfo().type).toEqual('SET_USER_ACCOUNT_INFO');
    });
    it('should pass on the payload.first_name we pass in', () => {
      expect(setAccountInfo(user).payload.first_name).toEqual(user.first_name);
    });
    it('should pass on the payload.last_name we pass in', () => {
      expect(setAccountInfo(user).payload.last_name).toEqual(user.last_name);
    });
    it('should pass on the payload.email we pass in', () => {
      expect(setAccountInfo(user).payload.email).toEqual(user.email);
    });
    it('should pass on the payload.phone_number we pass in', () => {
      expect(setAccountInfo(user).payload.phone_number).toEqual(user.phone_number);
    });
  });
  describe('fetchUserAction', () => {
    beforeEach(() => {
      mock = new MockAdapter(axios);
      mock.onGet('/users/1').reply(200, user);
    });
    it('should add expected action to the store', () => {
      const expectedActions = { type: SET_USER_ACCOUNT_INFO, payload: user };
      return store.dispatch(fetchUser(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedActions);
        });
    });
    it('should add expected action payload to the store', () =>
      store.dispatch(fetchUser(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].payload).toEqual(user);
        })
    );
  });
});
