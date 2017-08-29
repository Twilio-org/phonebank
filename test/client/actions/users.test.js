import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setAccountInfo, fetchUser, updateUser, registerNewUser } from '../../../public/src/actions/users';
import { defaultUserAccountInfo } from '../../../public/src/reducers/users';
import { mockStore, exposeLocalStorageMock } from '../client_test_helpers';

exposeLocalStorageMock();

const user = {
  first_name: 'Oscar',
  last_name: 'Grouch',
  email: 'oscar@g.com',
  phone_number: '15555555555',
  password: 'pass'
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

describe('User Actions', () => {
  describe('registrationAction', () => {
    describe('registerNewUserAction', () => {
      store = mockStore(defaultUserAccountInfo);
      mocker = new MockAdapter(axios);
      beforeEach(() => {
        mocker.onPost('/auth/register').reply(201, user);
      });
      afterEach(() => {
        mocker.reset();
      });
      it('should mock the post request with a 201 status', () => {
        return store.dispatch(registerNewUser(user, history))
          .then((res) => {
            expect(res.status).toEqual(201);
            expect(res.data).toEqual(user);
            expect(res.config.method).toEqual('post');
          });
      });
      it('should call history.push and "redirect" history to "/public/login"', () => {
        return store.dispatch(registerNewUser(user, history))
          .then(() => {
            expect(history.push).toBeCalled();
            expect(history.push.mock.calls[0]).toEqual(['/public/login']);
          });
      });
    });
  });
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
    store = mockStore(defaultUserAccountInfo);
    mocker = new MockAdapter(axios);
    beforeEach(() => {
      mocker.onGet('/users/1').reply(200, user);
    });
    afterEach(() => {
      mocker.reset();
    });
    it('should add expected action to the store', () => {
      const expectedAction = setAccountInfo(user);
      const { type, payload } = expectedAction;
      return store.dispatch(fetchUser(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(type);
          expect(actions[0].payload).toEqual(payload);
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
  describe('editAccountActions', () => {
    mocker = new MockAdapter(axios);
    store = mockStore(defaultUserAccountInfo);
    beforeEach(() => {
      mocker.onPut('/users/1').reply(200, updatedUser);
    });
    afterEach(() => {
      mocker.reset();
    });
    describe('updateUser', () => {
      it('should redirect to "/volunteers/1"', () =>
        store.dispatch(updateUser(1, updatedUser, history))
          .then(() => {
            expect(history.push).toBeCalled();
            expect(history.push.mock.calls[2]).toEqual(['/volunteers/1']);
          })
      );
      it('should have a method called updateUser', () => {
        expect(typeof updateUser).toBe('function');
      });
    });
  });
});
