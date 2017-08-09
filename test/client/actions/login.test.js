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

const store = mockStore(initialState, authStatus);

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
    this._store[key] = value.toString();
  }
  removeItem(key) {
    delete this._store[key];
  }
}

const history = {
  push: function (value) {
    console.log(value);
  }
};

global.localStorage = new LocalStorageMock();

const user = {
  first_name: 'Oscar',
  last_name: 'Grouch',
  email: 'oscar@g.com',
  phone_number: '15555555555'
};

describe('loginActions', () => {
  describe('setUserAuthCredentials', () => {
    it('should have a type of "SET_AUTH_JWT_FULFILLED"', () => {
      expect(setUserAuthCredentials().type).toEqual('SET_AUTH_JWT_FULFILLED');
    });
    it('should pass on the correct payload we pass in', () => {
      expect(setUserAuthCredentials(user).payload).toEqual(user);
    });
  });
  describe('clearAuthCredentials', () => {
    it('should have a type of "CLEAR_AUTH"', () => {
      expect(clearAuthCredentials().type).toEqual('CLEAR_AUTH');
    });
  });
  describe('logout', () => {
    it('should have a type of "LOGOUT_USER"', () => {
      expect(logout().type).toEqual('LOGOUT_USER');
    });
  });
  describe('loginUser', () => {
    beforeEach(() => {
      const mock = new MockAdapter(axios);
      const newUser = {
        email: 'oscar@g.com',
        password: '1234'
      };
      mock.onPost('/auth/login', newUser, history).reply(200, {
        token: 'token',
        id: 1
      });
      setTimeout(loginUser(newUser, history), 5000);
      // setTimeout(() => done(), 10000);
    });
    test('updating localStorage with loginUser', () => {
      console.log('global.localstorage is: ', global.localStorage);
      expect(global.localStorage.auth_token).toEqual('token');
    });
    test('history should have "/" as argument', () => {
      expect(history[0]).toEqual('/');
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
