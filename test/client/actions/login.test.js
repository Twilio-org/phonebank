import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setUserAuthCredentials, clearAuthCredentials, logout, loginUser, logoutUser } from '../../../public/src/actions/login';
import { mockStore, exposeLocalStorageMock } from '../client_test_helpers';
import { defaultUserAccountInfo } from '../../../public/src/reducers/account_info';
import { defaultAuthStatus } from '../../../public/src/reducers/login';

exposeLocalStorageMock();

const loginUserInfo = {
  email: 'harry@hogwarts.com',
  password: '1234'
};

let mocker;
let store;
const history = {
  push: jest.fn()
};

const user = {
  id: 1,
  first_name: 'Oscar',
  last_name: 'Grouch',
  email: 'oscar@g.com',
  phone_number: '15555555555',
  is_admin: false
};

const loginUserResponse = {
  token: 'token',
  id: 1,
  is_admin: false
};

describe('loginActions', () => {
  describe('setUserAuthCredentials', () => {
    const { type, payload } = setUserAuthCredentials(user);
    it('should have a type of "SET_AUTH_JWT_FULFILLED"', () => {
      expect(type).toEqual('SET_AUTH_JWT_FULFILLED');
    });
    it('should pass on the correct payload we pass in', () => {
      expect(payload).toEqual(user);
    });
  });
  describe('clearAuthCredentials', () => {
    const { type } = clearAuthCredentials();
    it('should have a type of "CLEAR_AUTH"', () => {
      expect(type).toEqual('CLEAR_AUTH');
    });
  });
  describe('logout', () => {
    const { type } = logout();
    it('should have a type of "LOGOUT_USER"', () => {
      expect(type).toEqual('LOGOUT_USER');
    });
  });
  describe('loginUser', () => {
    mocker = new MockAdapter(axios);
    beforeEach(() => {
      store = mockStore(defaultUserAccountInfo, defaultAuthStatus);
      mocker.onPost('/auth/login').reply(200, loginUserResponse);
    });
    afterEach(() => {
      mocker.reset();
    });
    it('should add the "auth_token", "is_admin" to localStorage', () => {
      return store.dispatch(loginUser(loginUserInfo, history))
        .then(() => {
          expect(global.localStorage.getItem('auth_token')).toEqual('token');
          expect(global.localStorage.getItem('permissions')).toBe('false');
        });
    });
    it('should dispatch the setUserAuthCredentials action to the store', () => {
      return store.dispatch(loginUser(loginUserInfo, history))
        .then(() => {
          const { type } = setUserAuthCredentials(user);
          const { id } = loginUserResponse;
          const actions = store.getActions();
          expect(actions[0].type).toEqual(type);
          expect(actions[0].payload.id).toEqual(id);
        });
    });
    it('should call history.push()', () => {
      return store.dispatch(loginUser(loginUserInfo, history))
        .then(() => {
          expect(history.push).toBeCalled();
          expect(history.push.mock.calls[0]).toEqual(['/admin']);
        });
    });
  });
  describe('logoutUser', () => {
    mocker = new MockAdapter(axios);
    beforeEach(() => {
      store = mockStore(defaultUserAccountInfo, defaultAuthStatus);
      mocker.onGet('/logout').reply(200);
    });
    afterEach(() => {
      mocker.reset();
    });
    it('should remove auth_token and is_admin from localStorage', () => {
      expect(global.localStorage.getItem('auth_token')).toEqual('token');
      return store.dispatch(logoutUser(history))
        .then(() => {
          expect(global.localStorage.getItem('auth_token')).toEqual(undefined);
          expect(global.localStorage.getItem('is_admin')).toEqual(undefined);
        });
    });
    it('should dispatch the logout action to the store', () => {
      const { type } = logout();
      return store.dispatch(logoutUser(history))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(type);
        });
    });
  });
});
