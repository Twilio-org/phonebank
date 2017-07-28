import { accountInfoReducer } from '../../public/src/reducers/account_info';

describe('accountInfoReducer', () => {
  it('should return the initial state', () => {
    expect(accountInfoReducer(undefined, {})).toEqual({
      email: null,
      first_name: null,
      last_name: null,
      phone_number: null
    });
  });
});
