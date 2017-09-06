import { accountInfoReducer } from '../../../public/src/reducers/users';

describe('accountInfoReducer', () => {
  const user = {
    first_name: 'Mr.',
    last_name: 'Cat',
    email: 'mrcat@gmail.com',
    phone_number: '15555555555',
    is_admin: true,
    user_call_sid: null
  };
  it('should return the initial state', () => {
    expect(accountInfoReducer(undefined, {})).toEqual({
      email: null,
      first_name: null,
      last_name: null,
      phone_number: null,
      is_admin: null,
      user_call_sid: null
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
      is_admin: true,
      user_call_sid: null
    });
  });

  it('should react to an action with the type SET_USER_CALL_SID: ', () => {
    const expectedResult1 = {
      first_name: 'Mr.',
      last_name: 'Cat',
      email: 'mrcat@gmail.com',
      phone_number: '15555555555',
      is_admin: true,
      user_call_sid: 'meow'
    };

    expect(accountInfoReducer(user,
      {
        type: 'SET_USER_CALL_SID',
        payload: 'meow'
      }
    )).toEqual(expectedResult1);
  });
  it('should react to an action with the type CLEAR_USER_CALL_SID', () => {
    const expectedResult2 = {
      first_name: 'Mr.',
      last_name: 'Cat',
      email: 'mrcat@gmail.com',
      phone_number: '15555555555',
      is_admin: true,
      user_call_sid: null
    };
    const action2 = {
      type: 'CLEAR_USER_CALL_SID'
    };
    expect(accountInfoReducer(user, action2)).toEqual(expectedResult2);
  });
});
