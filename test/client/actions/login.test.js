import { setUserAuthCredentials } from '../../../public/src/actions/login';

describe('actions', () => {
  describe('setUserAuthCredentials', () => {
    it('should have a type of "SET_AUTH_JWT_FULFILLED"', () => {
      expect(setUserAuthCredentials().type).toEqual('SET_AUTH_JWT_FULFILLED');
    });
  });
});

