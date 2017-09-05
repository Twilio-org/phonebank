import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockStore, exposeLocalStorageMock } from '../client_test_helpers';
import { setCurrentCall, setNextCall, assignToCall } from '../../../public/src/actions/calls';
import { defaultCalls } from '../../../public/src/reducers/calls';
import fixtures from '../client_fixtures';

let mocker;
let store;
exposeLocalStorageMock();
const { call1, assignedCall1, currentCall2 } = fixtures.callsFixture;

describe('Call Actions', () => {
  describe('assignToCall Action', () => {
    store = mockStore(defaultCalls);
    mocker = new MockAdapter(axios);
    beforeEach(() => {
      mocker.onGet('/users/1/campaigns/1/calls').reply(200, assignedCall1);
    });
    afterEach(() => {
      mocker.reset();
    });
    it('should dispatch setCurrentCall action if a currentCall does not exist', () => {
      const userId = 1;
      const { type, payload } = setCurrentCall(assignedCall1);
      store.dispatch(assignToCall(userId, call1.campaign_id))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(type);
          expect(actions[0].payload).toEqual(payload);
        })
        .catch((err) => {
          console.log(`Error in assignToCall action dispatch setCurrentCall is: ${err}`);
        });
    });
    it('should dispatch setNextCall action if a currentCall exists', () => {
      const userId = 1;
      const { type, payload } = setNextCall(assignedCall1);
      store.dispatch(assignToCall(userId, call1.campaign_id, currentCall2))
        .then(() => {
          const actions = store.getActions();
          expect(actions[1].type).toEqual(type);
          expect(actions[1].payload).toEqual(payload);
        })
        .catch((err) => {
          console.log(`Error in assignToCall action dispatch setNextCall is: ${err}`);
        });
    });
  });
});
