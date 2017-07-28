import { setAccountInfo } from '../../../public/src/actions/account_info';

describe('actions', () => {
  describe('setAccountInfo', () => {
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
});

