import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import nock from 'nock';
import sinon from 'sinon';
import { updateUser, deleteUser } from '../../../public/src/actions/edit_account';
import { logoutUser as LogoutAction } from '../../../public/src/actions/login';

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
  describe('deleteUser', () => {
    // let scope;
    let xhr;
    let requests;
    let server;
    beforeEach(() => {
      // mocker.onPatch('/users/1').reply(204);
      // scope = nock('http://localhost:3000')
      //   .patch('/users/1')
      //   .intercept('/users/1', 'PATCH')
      //   .reply(204);
      // xhr = sinon.useFakeXMLHttpRequest();
      // xhr.responseType = 'PATCH';
      // xhr.status = 204;
      // requests = [];
      // xhr.onCreate = req => requests.push(req);
      server = sinon.fakeServer.create();
    });
    afterEach(() => {
      // xhr.restore();
      server.restore();
    });
    it('should call patch route once', () => {
      const callback = sinon.spy();
      deleteUser(1, history, callback);
      // console.log('requests are: ', requests);
      // console.log('xhr is: ', xhr);
      console.log('the server is: ', server);
      console.log('requests are: ', server.requests);
      server.requests[0].respond(204);
      expect(callback.calledOnce).toBe(true);
      // expect(requests.length).toEqual(1);
      // expect(requests[0].url).toEqual('/users/1');
      // jest.unmock('history.push');
      // const logoutUser = jest.fn();
      // const stub = sinon.stub(axios, 'patch').yields(null, { statusCode: 204 });
      // const stub = sinon.stub(axios, 'patch').callsFake(() => 'success');
      // const stub = sinon.stub(deleteUser);
      // console.log('stub is: ', stub);
      // return store.dispatch(stub.withArgs(1, history))
      //   .then((res) => {
      //     console.log('res is: ', res);
          // expect(store.dispatch(logoutUser(history))).toBeCalled();
          // expect(res.status).toEqual(204);
        // });
    });
  });
});
