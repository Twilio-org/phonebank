import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setAccountInfo, fetchUser, updateUser, registerNewUser, addCampaignToUser } from '../../../public/src/actions/users';
import { defaultUserAccountInfo } from '../../../public/src/reducers/users';
import { mockStore, exposeLocalStorageMock } from '../client_test_helpers';

exposeLocalStorageMock();

const user = {
  first_name: 'Oscar',
  last_name: 'Grouch',
  email: 'oscar@g.com',
  phone_number: '15555555555',
  password: 'pass'
};

const updatedAdminUser = {
  first_name: 'Mickey',
  last_name: 'Mouse',
  phone_number: '15555555555',
  email: 'mickey@mouse.com',
  is_admin: true
};

const updatedVolunteerUser = {
  first_name: 'Minney',
  last_name: 'Mouse',
  phone_number: '15555555556',
  email: 'minney@mouse.com',
  is_admin: false
};

let mocker;
let store;
const history = {
  push: jest.fn()
};

describe('User Actions', () => {
  describe('registrationAction', () => {
    describe('registerNewUserAction', () => {
      store = mockStore(defaultUserAccountInfo);
      mocker = new MockAdapter(axios);
      beforeEach(() => {
        mocker.onPost('/auth/register').reply(201, user);
      });
      afterEach(() => {
        mocker.reset();
      });
      it('should mock the post request with a 201 status and redirec to to "/public/login"', () => {
        return store.dispatch(registerNewUser(user, history))
          .then((res) => {
            expect(res.status).toEqual(201);
            expect(res.data).toEqual(user);
            expect(res.config.method).toEqual('post');
            expect(history.push).toBeCalled();
            expect(history.push.mock.calls[0]).toEqual(['/public/login']);
          });
      });
    });
  });
  describe('setAccountInfo Action', () => {
    it('should have a type of "SET_USER_ACCOUNT_INFO"', () => {
      expect(setAccountInfo().type).toEqual('SET_USER_ACCOUNT_INFO');
    });
    it('should pass on the payload.first_name we pass in', () => {
      expect(setAccountInfo(user).payload.first_name).toEqual(user.first_name);
    });
    it('should pass on the payload.last_name we pass in', () => {
      expect(setAccountInfo(user).payload.last_name).toEqual(user.last_name);
    });
    it('should pass on the payload.email we pass in', () => {
      expect(setAccountInfo(user).payload.email).toEqual(user.email);
    });
    it('should pass on the payload.phone_number we pass in', () => {
      expect(setAccountInfo(user).payload.phone_number).toEqual(user.phone_number);
    });
  });
  describe('fetchUserAction', () => {
    store = mockStore(defaultUserAccountInfo);
    mocker = new MockAdapter(axios);
    beforeEach(() => {
      mocker.onGet('/users/1').reply(200, user);
    });
    afterEach(() => {
      mocker.reset();
    });
    it('should add expected action to the store', () => {
      const expectedAction = setAccountInfo(user);
      const { type, payload } = expectedAction;
      return store.dispatch(fetchUser(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(type);
          expect(actions[0].payload).toEqual(payload);
        });
    });
    it('should add expected action payload to the store', () =>
      store.dispatch(fetchUser(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].payload).toEqual(user);
        })
    );
  });
  describe('editAccountActions for admin user', () => {
    mocker = new MockAdapter(axios);
    store = mockStore(defaultUserAccountInfo);
    beforeEach(() => {
      mocker.onPut('/users/1').reply(200, updatedAdminUser);
    });
    afterEach(() => {
      mocker.reset();
    });
    describe('updateUser Admin', () => {
      it('should redirect updated admin account to "/admin/account/1"', () => {
        const { is_admin } = updatedAdminUser;
        store.dispatch(updateUser(1, updatedAdminUser, is_admin, history))
          .then(() => {
            expect(history.push).toBeCalled();
            expect(history.push.mock.calls[1]).toEqual(['/admin/account/1']);
          });
      });
      it('should have a method called updateUser', () => {
        expect(typeof updateUser).toBe('function');
      });
    });
  });
  describe('editAccountActions for volunteer user', () => {
    mocker = new MockAdapter(axios);
    store = mockStore(defaultUserAccountInfo);
    beforeEach(() => {
      mocker.onPut('/users/2').reply(200, updatedVolunteerUser);
    });
    afterEach(() => {
      mocker.reset();
    });
    describe('updateUser Volunteer', () => {
      it('should redirect updated volunteer account to "/volunteers/account/2"', () => {
        const { is_admin } = updatedVolunteerUser;
        store.dispatch(updateUser(2, updatedVolunteerUser, is_admin, history))
          .then(() => {
            expect(history.push).toBeCalled();
            expect(history.push.mock.calls[2]).toEqual(['/volunteers/account/2']);
          });
      });
    });
  });
  describe('addCampaignToUser Action', () => {
    mocker = new MockAdapter(axios);
    store = mockStore(defaultUserAccountInfo);
    beforeEach(() => {
      mocker.onPost('/users/1/campaigns').reply(201);
    });
    afterEach(() => {
      mocker.reset();
    });
    it('should mock the post request with status 201 then redirect to "/volunteers/campaigns"', () => {
      const mockCampaignId = 1;
      const mockUserId = 1;
      store.dispatch(addCampaignToUser(mockUserId, mockCampaignId, history))
        .then((res) => {
          const data = JSON.parse(res.config.data);
          expect(res.status).toEqual(201);
          expect(res.config.method).toEqual('post');
          expect(res.config.url).toEqual('/users/1/campaigns');
          expect(data.campaign_id).toEqual(mockCampaignId);
          expect(history.push).toBeCalled();
          expect(history.push.mock.calls[3]).toEqual(['/volunteers/campaigns']);
        })
        .catch((err) => {
          console.log(`Error in addCampaignToUser action test is: ${err}`);
        });
    });
  });
});
