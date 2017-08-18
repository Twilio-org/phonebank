import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { updateUser, deleteUser } from '../../../public/src/actions/edit_account';
import { logoutUser } from '../../../public/src/actions/login';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  first_name: null,
  last_name: null,
  email: null,
  phone_number: null
};

// const store = mockStore(initialState);

const localStorageMock = (() => {
  let localstore = {};
  return {
    getItem(key) {
      return localstore[key];
    },
    setItem(key, value) {
      localstore[key] = value.toString();
    },
    clear() {
      localstore = {};
    }
  };
})();

global.localStorage = localStorageMock;

const user = {
  first_name: 'Oscar',
  last_name: 'Grouch',
  phone_number: '15555555555',
  email: 'oscar@g.com'
};

const updatedUser = {
  first_name: 'Mickey',
  last_name: 'Mouse',
  phone_number: '15555555555',
  email: 'oscar@g.com'
};

let mocker;
let store;
const history = {
  push: jest.fn()
};

describe('editAccountActions', () => {
  beforeEach(() => {
    mocker = new MockAdapter(axios);
    store = mockStore(initialState);
  });
  afterEach(() => {
    mocker.reset();
  });
  describe('updateUser', () => {
    beforeEach(() => {
      mocker
        .onPost('/users/1').reply(201, user)
        .onPut('/users/1').reply(200, updatedUser);
    });
    it('should redirect to "/account/1"', () => {
      return store.dispatch(updateUser(1, updatedUser, history))
        .then(() => {
          expect(history.push).toBeCalled();
          expect(history.push.mock.calls[0]).toEqual(['/account/1']);
        });
    });
    it('should have a method called updateUser', () => {
      expect(typeof updateUser).toBe('function');
    });
  });
  describe('deleteUser', () => {
    beforeEach(() => {
      mocker.onPatch('/users/1').reply(204);
    });
    it('should call patch route once', () => {
      return store.dispatch(deleteUser(1, history))
        .then((response) => {
          console.log('the response is: ', response);
          // expect(store.dispatch(logoutUser(history))).toBeCalled();
          expect(response.status).toEqual(204);
        });
    });
  });
});
