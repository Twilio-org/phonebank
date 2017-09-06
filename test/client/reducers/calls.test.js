import { adminUsersReducer, SET_USERS, SET_USER_CURRENT } from '../../../public/src/reducers/admin_users';

import fixtures from '../client_fixtures';
import { checkObjectProps, isObjectEmpty } from '../client_test_helpers';

import { voulunteerCallsreducer,
         SET_CALL_CURRENT,
         CLEAR_CALL_CURRENT,
         UPDATE_CALL_STATUS,
         UPDATE_CALL_OUTCOME,
         SET_CALL_CONTACT_INFO,
         SET_CURRENT_CALL_ACTIVE,
         SET_CURRENT_CALL_INACTIVE } from '../../../public/src/reducers/calls';

const { dbFixture, callState: storeState } = fixtures.callsFixtures;

const mockCallActions = [
  {
    type: SET_CALL_CURRENT,
    payload: dbFixture
  },
  {
    type: CLEAR_CALL_CURRENT
  },
  {
    type: UPDATE_CALL_STATUS,
    payload: 'IN_PROGRESS'
  },
  {
    type: UPDATE_CALL_OUTCOME,
    payload: 'LEFT_MESSAGE'
  },
  {
    type: SET_CALL_CONTACT_INFO,
    payload: { name: 'meow' }
  },
  {
    type: SET_CURRENT_CALL_ACTIVE
  },
  {
    type: SET_CURRENT_CALL_INACTIVE
  },
  {
    type: 'SET_CALL_CATS',
    payload: 'many cats'
  }
];

const [ currentCall, clearCurrent, updateStatus, updateOutcome, setContact, callActive, callInactive, fake ] = mockCallActions;
