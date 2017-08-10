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
  phone_number: '15555555555',
  email: 'oscar@g.com'
};

// jest.mock('../../../public/src/actions/edit_account', () => jest.fn());
updateUser = jest.fn();

describe('editAccountActions', () => {
  describe('updateUser', () => {
    beforeEach(() => {
      const mocker = new MockAdapter(axios);
      mocker.onPut('/users/:id', { params: {
        first_name: 'Mickey',
        last_name: 'Mouse',
        phone_number: '15555555555',
        email: 'oscar@g.com'
      } }).reply(200);
    });
    it('should update user account', () => {
      const newUserInfo = {
        first_name: 'Mickey',
        last_name: 'Mouse',
        phone_number: '15555555555',
        email: 'oscar@g.com'
      };
      return store.dispatch(updateUser(1, newUserInfo))
        .then(() => {
          expect(store.payload).toEqual(newUserInfo);
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
    it('should call this.props.deleteUser with two arguments: id (31) and history', () => {
      const mockCallsArray = deleteUser.mock.calls[0];
      expect(mockCallsArray.length).toBe(2);
      // expect(mockCallsArray[0]).toBe(31);
      // expect(mockCallsArray[1]).toBe('history');
    });
  });
});
