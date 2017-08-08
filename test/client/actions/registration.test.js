// getting correct parameters - user info should have all those properties
// param types should be strings
// expect nothing to be null or undefined
// should ping '/auth/register'
// should call 'history.push' once with argument ('/login') - jest mocks - see Andi's component test
// if error - should throw with message/name

import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { registerNewUser } from '../../../public/src/actions/registration.jsx';

let mockPromise;

jest.mock('../../../public/src/actions/registration.jsx', () => {
  registerNewUser: jest.fn(() => mockPromise)
});

const newMockStore = {
  auth: {
    id: null
  },
  accountInfo: {
    first_name: null,
    last_name: null,
    email: null,
    phone_number: null
  }
};

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

const user = {
  first_name: 'Hermione',
  last_name: 'Granger',
  email: 'griff4life@hogwarts.com',
  phone_number: '15555555555',
  password: 'pass'
};

describe('registrationAction', () => {
  describe('registerNewUserAction', () => {
    mock.onPost('/auth/register').reply(200, {
      first_name: 'Hermione',
      last_name: 'Granger',
      email: 'griff4life@hogwarts.com',
      phone_number: '15555555555',
      password: 'pass'
    });
    it('should take in 5 parameters', () => {
      const numberOfMockCalls = registerNewUser.mock.calls[0];
      console.log(numberOfMockCalls);
      expect(registerNewUser).toHaveBeenCalledTimes(1);
      expect(numberOfMockCalls).toBe(1);
    });
  });
});
