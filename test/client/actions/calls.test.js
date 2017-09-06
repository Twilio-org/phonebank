import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockStore, exposeLocalStorageMock } from '../client_test_helpers';
import { setCurrentCall, setNextCall, assignToCall } from '../../../public/src/actions/calls';
import { defaultCalls } from '../../../public/src/reducers/calls';
import fixtures from '../client_fixtures';

exposeLocalStorageMock();
let mocker;
let store;
const { call, assignedCall, currentCall } = fixtures.callsFixture;

describe('Call Actions', () => {
  describe('assignToCall Action', () => {
    store = mockStore(defaultCalls);
    mocker = new MockAdapter(axios);
    beforeEach(() => {
      mocker.onGet('/users/1/campaigns/1/calls').reply(200, assignedCall);
    });
    afterEach(() => {
      mocker.reset();
    });
    it('should dispatch setCurrentCall action', () => {
      const userId = 1;
      const { type, payload } = setCurrentCall(assignedCall);
      store.dispatch(assignToCall(userId, call.campaign_id))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(type);
          expect(actions[0].payload).toEqual(payload);
        })
        .catch((err) => {
          console.log(`Error in assignToCall action dispatch setCurrentCall is: ${err}`);
        });
    });
  });
});
