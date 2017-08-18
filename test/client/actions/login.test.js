import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setUserAuthCredentials, clearAuthCredentials, logout, loginUser, logoutUser } from '../../../public/src/actions/login';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  first_name: null,
  last_name: null,
  email: null,
  phone_number: null
};

const authStatus = {
  id: null
};

const loginUserInfo = {
  email: 'harry@hogwarts.com',
  password: '1234'
};

class LocalStorageMock {
  constructor() {
    this._store = {};
  }
  clear() {
    this._store = {};
  }
  getItem(key) {
    return this._store[key] || null;
  }
  setItem(key, value) {
    this._store[key] = value;
  }
  removeItem(key) {
    delete this._store[key];
  }
}

let mocker;
let store;
const history = {
  push: jest.fn()
};

global.localStorage = new LocalStorageMock();

const user = {
  id: 1,
  first_name: 'Oscar',
  last_name: 'Grouch',
  email: 'oscar@g.com',
  phone_number: '15555555555'
};

const loginUserResponse = {
  token: 'token',
  id: 1
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
      store = mockStore(initialState, authStatus);
      mocker.onPost('/auth/login').reply(200, loginUserResponse);
    });
    afterEach(() => {
      mocker.reset();
    });
    it('should add the "auth_token" to localStorage', () => {
      return store.dispatch(loginUser(loginUserInfo, history))
        .then(() => {
          expect(global.localStorage._store.auth_token).toEqual('token');
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
          expect(history.push.mock.calls[0]).toEqual(['/']);
        });
    });
  });
  describe('logoutUser', () => {
    mocker = new MockAdapter(axios);
    beforeEach(() => {
      store = mockStore(initialState, authStatus);
      mocker.onGet('/logout').reply(200);
    });
    afterEach(() => {
      mocker.reset();
    });
    it('should remove auth_token from localStorage', () => {
      expect(global.localStorage._store.auth_token).toEqual('token');
      return store.dispatch(logoutUser())
        .then(() => {
          expect(global.localStorage._store.auth_token).toEqual(undefined);
        });
    });
    it('should dispatch the logout action to the store', () => {
      const { type } = logout();
      return store.dispatch(logoutUser())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(type);
        });
    });
  });
});
