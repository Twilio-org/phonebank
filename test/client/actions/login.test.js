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

// const localStorageMock = (() => {
//   let localstore = {};
//   return {
//     getItem(key) {
//       return localstore[key];
//     },
//     setItem(key, value) {
//       localstore[key] = value.toString();
//     },
//     clear() {
//       localstore = {};
//     }
//   };
// });

// const storageMock = (() => {
//   const storage = {};

//   return {
//     setItem(key, value) {
//       storage[key] = value || '';
//     },
//     getItem(key) {
//       return key in storage ? storage[key] : null;
//     },
//     removeItem(key) {
//       delete storage[key];
//     },
//     get length() {
//       return Object.keys(storage).length;
//     },
//     key(i) {
//       const keys = Object.keys(storage);
//       return keys[i] || null;
//     }
//   };
// });

// global.localStorage = storageMock();
// window.localStorage = localStorageMock();

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value.toString();
  }
  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock;

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
      mock.onPost('/auth/login', newUser).reply(200, {
        token: 'token',
        id: 1
      });
      // let myStorage = window.localStorage;
      // let store = {};
      // sinon.spy(window.localStorage, 'getItem').andCallFake(function (key) {
      //   return store[key];
      // });
      // sinon.spy(window.localStorage, 'setItem').andCallFake(function (key, value) {
      //   store[key] = value + '';
      // });
      // sinon.spy(window.localStorage, 'removeItem').andCallFake(function () {
      //   store = {};
      // });
    });
    console.log('localstorage is: ', localStorage);
    it('should set the localStorage auth_token', () => {
      const newUser = {
        email: 'oscar@g.com',
        password: '1234'
      };
      loginUser(newUser, store);
      expect(localStorage.auth_token).toEqual('token');
    });
  });
});

