import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockStore, exposeLocalStorageMock } from '../client_test_helpers';
import { setCurrentCall,
         assignToCall,
         setVolunteerActive,
         clearVolunteerActive,
         clearCurrentCall,
         updateCallOutcome,
         updateCallStatus,
         setCallContactInfo,
         getCallContactInfo,
         updateCallAttempt,
         releaseCall } from '../../../public/src/actions/calls';
         // setCurrentCallActive,
         // setCurrentCallInactive,
import fixtures from '../client_fixtures';

const { dbFixture, initialState, contactFixture } = fixtures.callsFixtures;

const expectedProps = Object.keys(dbFixture);

function hasProp(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

exposeLocalStorageMock();

describe('Call Actions', () => {
  let mock;
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  describe('setVolunteerActive: ', () => {
    const setVolunteerActiveResult = setVolunteerActive();
    describe('type: ', () => {
      const { type } = setVolunteerActiveResult;
      it('should have a defined type property: ', () => {
        expect(type).toBeDefined();
      });
      it('should have the type property SET_VOLUNTEER_CALL_ACTIVE: ', () => {
        expect(type).toBe('SET_VOLUNTEER_CALL_ACTIVE');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = setVolunteerActiveResult;
      it('should not have a payload: ', () => {
        expect(payload).toBeUndefined();
        expect(hasProp(setVolunteerActiveResult, payload)).toBe(false);
      });
    });
  });

  describe('clearVolunteerActive: ', () => {
    const clearVolunteerActiveResult = clearVolunteerActive();
    describe('type: ', () => {
      const { type } = clearVolunteerActiveResult;
      it('should have a defined type property: ', () => {
        expect(type).toBeDefined();
      });
      it('should have the type CLEAR_VOLUNTEER_CALL_ACTIVE: ', () => {
        expect(type).toBe('CLEAR_VOLUNTEER_CALL_ACTIVE');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = clearVolunteerActiveResult;
      it('should not have a payload: ', () => {
        expect(payload).toBeUndefined();
        expect(hasProp(clearVolunteerActiveResult, payload)).toBe(false);
      });
    });
  });

  describe('setCurrentCall: ', () => {
    const setCurrentCallResult = setCurrentCall(dbFixture);
    describe('type: ', () => {
      const { type } = setCurrentCallResult;
      it('should have a defined type property: ', () => {
        expect(type).toBeDefined();
      });
      it('should have the type SET_CALL_CURRENT: ', () => {
        expect(type).toBe('SET_CALL_CURRENT');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = setCurrentCallResult;
      it('should be an object: ', () => {
        expect(typeof payload).toBe('object');
        expect(Array.isArray(payload)).toBe(false);
      });
      it(`should have all of the expected props: ${expectedProps.join(', ')}`, () => {
        const payloadProps = Object.keys(payload);
        expect(payloadProps).toEqual(expectedProps);
      });
    });
  });

  describe('clearCurrentCall: ', () => {
    const clearCurrentCallResult = clearCurrentCall();
    describe('type: ', () => {
      const { type } = clearCurrentCallResult;
      it('should have a defined type property: ', () => {
        expect(type).toBeDefined();
      });
      it('should have the type CLEAR_CALL_CURRENT: ', () => {
        expect(type).toBe('CLEAR_CALL_CURRENT');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = clearCurrentCallResult;
      it('should not have a payload: ', () => {
        expect(payload).toBeUndefined();
        expect(hasProp(clearCurrentCallResult, payload)).toBe(false);
      });
    });
  });

  describe('updateCallOutcome: ', () => {
    const updateCallOutcomeResult = updateCallOutcome('left_message');
    describe('type: ', () => {
      const { type } = updateCallOutcomeResult;
      it('should have a defined type property: ', () => {
        expect(type).toBeDefined();
      });
      it('should have the type UPDATE_CALL_OUTCOME: ', () => {
        expect(type).toBe('UPDATE_CALL_OUTCOME');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = updateCallOutcomeResult;
      it('should be an object: ', () => {
        expect(typeof payload).toBe('string');
        expect(payload).toBe('LEFT_MESSAGE');
        expect(payload === 'PENDING').toBe(false);
      });
    });
  });

  describe('updateCallStatus: ', () => {
    const updateCallStatusResult = updateCallStatus('in_progress');
    describe('type: ', () => {
      const { type } = updateCallStatusResult;
      it('should have a defined type property: ', () => {
        expect(type).toBeDefined();
      });
      it('should have the type UPDATE_CALL_STATUS: ', () => {
        expect(type).toBe('UPDATE_CALL_STATUS');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = updateCallStatusResult;
      it('should be an object: ', () => {
        expect(typeof payload).toBe('string');
        expect(payload).toBe('IN_PROGRESS');
        expect(payload === 'ASSIGNED').toBe(false);
      });
    });
  });

  describe('setCallContactInfo: ', () => {
    const setCallContactInfoResult = setCallContactInfo({ name: 'andipants' });
    describe('type: ', () => {
      const { type } = setCallContactInfoResult;
      it('should have a defined type property: ', () => {
        expect(type).toBeDefined();
      });
      it('should have the type SET_CALL_CONTACT_INFO: ', () => {
        expect(type).toBe('SET_CALL_CONTACT_INFO');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = setCallContactInfoResult;
      it('should be an object: ', () => {
        expect(typeof payload).toBe('object');
        expect(Array.isArray(payload)).toBe(false);
        expect(payload).toEqual({ name: 'andipants' });
      });
    });
  });

  describe('getCallContactInfo: ', () => {
    mock = new MockAdapter(axios);
    beforeEach(() => {
      mock.onGet('/contacts/1').reply(200, contactFixture);
    });
    afterEach(() => {
      mock.reset();
    });
    it('axios GET request: ', () => {
      const { first_name, last_name } = contactFixture;
      const name = last_name ? `${first_name} ${last_name}` : first_name;
      const expectedAction = setCallContactInfo({ name });
      return store.dispatch(getCallContactInfo(1))
        .then(() => {
          const [dispatchedAction] = store.getActions();
          const { type, payload } = dispatchedAction;
          expect(dispatchedAction).toEqual(expectedAction);
          expect(type).toBe('SET_CALL_CONTACT_INFO');
          expect(payload).toEqual({ name });
        })
        .catch(err => err);
    });
  });

  describe('releaseCall: ', () => {
    mock = new MockAdapter(axios);
    beforeEach(() => {
      mock.onDelete('/users/1/campaigns/1/calls/1').reply(200);
      mock.onGet('/users/1/campaigns/1/calls').reply(200, dbFixture);
    });
    afterEach(() => {
      mock.reset();
    });

    describe('axios delete request when next is false: ', () => {
      it('dispatched actions in the store:', () => {
        const expectedAction = clearCurrentCall();
        return store.dispatch(releaseCall(1, 1, 1, 'ASSIGNED'))
          .then(() => {
            const [dispatchedAction] = store.getActions();
            const { type, payload } = dispatchedAction;
            expect(dispatchedAction).toEqual(expectedAction);
            expect(type).toBe('CLEAR_CALL_CURRENT');
            expect(payload).toBeUndefined();
            expect(hasProp(dispatchedAction, 'payload')).toBe(false);
          })
          .catch(err => err);
      });
    });
    describe('axios delete request when next is true', () => {
      it('dispatched actions in the store:', () => {
        const expectedAction = undefined;
        return store.dispatch(releaseCall(1, 1, 1, 'ASSIGNED', true))
          .then(() => {
            const dispatchedAction = store.getActions();
            expect(dispatchedAction[1]).toEqual(expectedAction);
          })
          .catch(err => err);
      });
    });
    describe('axios delete request when status is IN_PROGRESS', () => {
      it('dispatched actions in the store:', () => {
        const shouldBeError = releaseCall(1, 1, 1, 'IN_PROGRESS', true);
        expect(shouldBeError.constructor).toBe(Error);
      });
    });
  });

  describe('updateCallAttempt: ', () => {
    mock = new MockAdapter(axios);
    beforeEach(() => {
      mock.onPut('/users/1/campaigns/1/calls/1/calls/1').reply(200);
      mock.onGet('/users/1/campaigns/1/calls').reply(200, dbFixture);
    });
    afterEach(() => {
      mock.reset();
    });
    // TODO: when form submission is finished, finish case for when call status is marked ATTEMPTED
    describe('aixios put request when call status is not ATTEMPTED: ', () => {
      it('should dispatch UPDATE_CALL_STATUS: ', () => {
        const expectedAction = updateCallStatus('in_progress');
        const updateCallParams = {
          user_id: 1,
          campaign_id: 1,
          call_id: 1,
          status: 'IN_PROGRESS',
          outcome: undefined,
          notes: undefined
        };
        return store.dispatch(updateCallAttempt(updateCallParams))
        .then(() => {
          const dispatchedAction = store.getActions();
          expect(dispatchedAction[0]).toEqual(expectedAction);
        })
        .catch(err => err);
      });
    });
  });

  describe('assignToCall Action', () => {
    // TODO: SHOULD THROW ERROR IF ASSIGNMENT NOT CORRECT!!!!
    mock = new MockAdapter(axios);
    beforeEach(() => {
      mock.onGet('/users/1/campaigns/1/calls').reply(200, dbFixture);
    });
    afterEach(() => {
      mock.reset();
    });
    it('should dispatch setCurrentCall action', () => {
      const userId = 1;
      const { campaign_id } = dbFixture;
      const { type, payload } = setCurrentCall(dbFixture);
      store.dispatch(assignToCall(userId, campaign_id))
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
