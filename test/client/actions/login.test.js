import { setUserAuthCredentials, clearAuthCredentials, logout } from '../../../public/src/actions/login';

describe('actions', () => {
  describe('setUserAuthCredentials', () => {
    it('should have a type of "SET_AUTH_JWT_FULFILLED"', () => {
      expect(setUserAuthCredentials().type).toEqual('SET_AUTH_JWT_FULFILLED');
    });
  });
  describe('clearAuthCredentials', () => {
    it('should have a type of "CLEAR_AUTH"', () => {
      expect(clearAuthCredentials().type).toEqual('CLEAR_AUTH');
    });
  });
  describe('logout', () => {
    it('should have a type of "LOGOUT_USER"', () => {
      expect(logout().type).toEqual('LOGOUT_USER');
    });
  });
});

