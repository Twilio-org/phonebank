import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { setAccountInfo, fetchUser } from '../../../public/src/actions/account_info';
import { SET_USER_ACCOUNT_INFO } from '../../../public/src/reducers/account_info';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    }
  };
})();

global.localStorage = localStorageMock;

describe('accountInfoActions', () => {
  describe('setAccountInfoAction', () => {
    it('should have a type of "SET_USER_ACCOUNT_INFO"', () => {
      expect(setAccountInfo().type).toEqual('SET_USER_ACCOUNT_INFO');
    });
    it('should pass on the payload.first_name we pass in', () => {
      const user = {
        first_name: 'Oscar',
        last_name: 'Grouch',
        email: 'oscar@g.com',
        phone_number: '15555555555'
      };
      expect(setAccountInfo(user).payload.first_name).toEqual(user.first_name);
    });
    it('should pass on the payload.last_name we pass in', () => {
      const user = {
        first_name: 'Oscar',
        last_name: 'Grouch',
        email: 'oscar@g.com',
        phone_number: '15555555555'
      };
      expect(setAccountInfo(user).payload.last_name).toEqual(user.last_name);
    });
    it('should pass on the payload.email we pass in', () => {
      const user = {
        first_name: 'Oscar',
        last_name: 'Grouch',
        email: 'oscar@g.com',
        phone_number: '15555555555'
      };
      expect(setAccountInfo(user).payload.email).toEqual(user.email);
    });
    it('should pass on the payload.phone_number we pass in', () => {
      const user = {
        first_name: 'Oscar',
        last_name: 'Grouch',
        email: 'oscar@g.com',
        phone_number: '15555555555'
      };
      expect(setAccountInfo(user).payload.phone_number).toEqual(user.phone_number);
    });
  });
  describe('fetchUserAction', () => {
    it('should execute fetchUser data', () => {
      // const scope = nock('http://localhost:3000', {
      //   reqheaders: {
      //     Authorization: 'Basic Auth'
      //   }
      // })
      //   .get('/users/:id')
      //   .reply(200, { body: {
      //     id: 1,
      //     first_name: 'Oscar',
      //     last_name: 'Grouch',
      //     email: 'oscar@g.com',
      //     phone_number: '15555555555'
      //   }
      //   });

      // console.log(scope);

      const initialState = {
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null
      };
      const store = mockStore(initialState);
      const user = {
        first_name: 'Oscar',
        last_name: 'Grouch',
        email: 'oscar@g.com',
        phone_number: '15555555555'
      };
      const expectedActions = { type: SET_USER_ACCOUNT_INFO, payload: user };

      return store.dispatch(fetchUser(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedActions);
        });
    });
    it('should add fetched data to the store', () => {
      nock('http://localhost:3000', {
        reqheaders: {
          Authorization: 'Basic Auth'
        }
      })
        .get('/users/:id')
        .reply(200, { body: {
          id: 1,
          first_name: 'Oscar',
          last_name: 'Grouch',
          email: 'oscar@g.com',
          phone_number: '15555555555'
        }
        });

      // const initialState = {
      //   first_name: null,
      //   last_name: null,
      //   email: null,
      //   phone_number: null
      // };
      // const store = mockStore(initialState);
      // const user = {
      //   first_name: 'Oscar',
      //   last_name: 'Grouch',
      //   email: 'oscar@g.com',
      //   phone_number: '15555555555'
      // };

      // return store.dispatch(fetchUser(1))
      //   .then(() => {
      //     const storeState = store.getState();
      //     console.log(storeState);
      //     expect(storeState).toEqual(user);
    });
  });
});
