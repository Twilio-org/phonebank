import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { updateUser, deleteUser } from '../../../public/src/actions/edit_account';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  first_name: null,
  last_name: null,
  email: null,
  phone_number: null
};

const store = mockStore(initialState);

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
  email: 'oscar@g.com',
  phone_number: '15555555555'
};

jest.mock('../../../public/src/actions/edit_account', () => jest.fn());

describe('editAccountActions', () => {
  describe('updateUser', () => {
    beforeEach(() => {
      const mock = new MockAdapter(axios);

      mock.onPut('/users/1').reply(200, {
        first_name: 'Oscar',
        last_name: 'Grouch',
        email: 'oscar@g.com',
        phone_number: '15555555555'
      });
    });
    it('should update user account', () => {
      // const newUserInfo = {
      //   first_name: 'Mickey',
      //   last_name: 'Mouse',
      //   email: 'oscar@g.com',
      //   phone_number: '15555555555'
      // };
      return store.dispatch(updateUser(1, user))
        .then(() => {
          expect(store.payload).toEqual(user);
        });
    });
    it('should have a method called updateUser', () => {
      expect(typeof updateUser).toBe('function');
    });
    it('should call updateUser once', () => {
      const numberOfMockCalls = updateUser.mock.calls.length;
      expect(updateUser).toHaveBeenCalledTimes(1);
      expect(numberOfMockCalls).toBe(1);
    });
  });
});
