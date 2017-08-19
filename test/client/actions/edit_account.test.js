import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { updateUser } from '../../../public/src/actions/edit_account';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  first_name: null,
  last_name: null,
  email: null,
  phone_number: null
};

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
});
