import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import sinon from 'sinon';
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
          const { token } = loginUserResponse;
          console.log('the token is: ', token);
          expect(global.localStorage.setItem('auth_token', 'token')).toBeCalled();
          // expect(global.localStorage.getItem[0]).toEqual(token);
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
});


// test('loginUser updates localStorage', async () => {
    //   expect.assertions(1);
    //   const newUser = {
    //     email: 'oscar@g.com',
    //     password: '1234'
    //   };
    //   await loginUser(newUser, history);
    //   console.log('localStorage is: ', global.localStorage);
    //   expect(global.localStorage.auth_token).toEqual('token');
    // });
    // const newUser = {
    //   email: 'oscar@g.com',
    //   password: '1234'
    // };

    // loginUser(newUser, history);
    // describe('updating localStorage with loginUser', () => {
    //   it('should set the localStorage auth_token', () => {
    //     console.log('localstorage is: ', global.localStorage);
    //     expect(global.localStorage.auth_token).toEqual('token');
    //   });
    // });
