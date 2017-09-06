import { accountInfoReducer } from '../../../public/src/reducers/users';

describe('accountInfoReducer', () => {
  const user = {
    first_name: 'Mr.',
    last_name: 'Cat',
    email: 'mrcat@gmail.com',
    phone_number: '15555555555',
    is_admin: true
  };
  it('should return the initial state', () => {
    expect(accountInfoReducer(undefined, {})).toEqual({
      email: null,
      first_name: null,
      last_name: null,
      phone_number: null,
      is_admin: null
    });
  });
  it('should react to an action with the type SET_USER_ACCOUNT_INFO', () => {
    expect(accountInfoReducer(user, {
      type: 'SET_USER_ACCOUNT_INFO',
      payload: user
    })).toEqual({
      first_name: 'Mr.',
      last_name: 'Cat',
      email: 'mrcat@gmail.com',
      phone_number: '15555555555',
      is_admin: true
    });
  });
});
