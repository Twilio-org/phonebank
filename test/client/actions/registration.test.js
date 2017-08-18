import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import registerNewUser from '../../../public/src/actions/registration.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  first_name: null,
  last_name: null,
  email: null,
  phone_number: null,
  password: null
};

const store = mockStore(initialState);
const history = {
  push: jest.fn()
};

const user = {
  first_name: 'Hermione',
  last_name: 'Granger',
  email: 'griff4life@hogwarts.com',
  phone_number: '15555555555',
  password: 'pass'
};

describe('registrationAction', () => {
  describe('registerNewUserAction', () => {
    const mocker = new MockAdapter(axios);
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
    it('should call history.push and "redirect" history to "/login"', () => {
      return store.dispatch(registerNewUser(user, history))
        .then(() => {
          expect(history.push).toBeCalled();
          expect(history.push.mock.calls[0]).toEqual(['/login']);
        });
    });
  });
});
