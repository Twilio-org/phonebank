import { authStatusReducer } from '../../../public/src/reducers/login';

describe('authStatusReducer', () => {
  it('should return the initial state', () => {
    expect(authStatusReducer(undefined, {})).toEqual({
      id: null
    });
  });
  it('should react to an action with the type CLEAR_AUTH', () => {
    const authStatus = {
      id: 1
    };
    expect(authStatusReducer(authStatus, {
      type: 'CLEAR_AUTH'
    })).toEqual({
      id: null
    });
  });
  it('should react to an action with the type SET_AUTH_JWT_FULFILLED', () => {
    const authStatus = {
      id: 1
    };
    const user = {
      first_name: 'Mr.',
      last_name: 'Cat',
      email: 'mrcat@gmail.com',
      phone_number: '15555555555',
      id: 1
    };
    expect(authStatusReducer(authStatus, {
      type: 'SET_AUTH_JWT_FULFILLED',
      payload: user
    })).toEqual({
      id: 1
    });
  });
});
