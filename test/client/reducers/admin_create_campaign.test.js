import { campaignFormReducer, SET_CAMPAIGN_FORM_SCRIPT, SET_CAMPAIGN_FORM_CONTACT_LIST } from '../../../public/src/reducers/create_campaign';

import fixtures from '../client_fixtures';
import { checkObjectProps, isObjectEmpty } from '../client_test_helpers';

const { defaultScriptsContactsForm: initialState } = fixtures.campaignFixtures; 
const { listFixture: scriptListFixtures,
        mapFixture: scriptFixture } = fixtures.scriptFixtures;
const { listFixture: contactListFixtures,
        mapFixture: contactListFixture } = fixtures.contactListFixtures;

const mockCampaignFormActions = [
  {
    type: SET_CAMPAIGN_FORM_SCRIPT,
    payload: scriptListFixtures
  },
  {
    type: SET_CAMPAIGN_FORM_CONTACT_LIST,
    payload: contactListFixtures
  },
  {
    type: 'RANDOM_TYPE',
    payload: 'nothing'
  }
];

const [script, contactList, fake] = mockCampaignFormActions;
const expectedScriptProps = Object.keys(scriptFixture);
const expectedContactListProps = Object.keys(contactListFixture);

describe('campaignFormReducer tests: ', () => {
  describe('default behavior', () => {
    const defaultState = campaignFormReducer(undefined, {});
    const { scripts, contact_lists } = defaultState;
    it('should return default state if there is no matching action types', () => {
      expect(defaultState).toEqual(initialState);
    });
    it('scripts key should exist and is an empty array', () => {
      expect(scripts).toBeTruthy();
      expect(Array.isArray(scripts)).toBeTruthy();
      expect(scripts.length).toBe(0);
    });
    it('contact_lists key should exist and is an empty array', () => {
      expect(contact_lists).toBeTruthy();
      expect(Array.isArray(contact_lists)).toBeTruthy();
      expect(contact_lists.length).toBe(0);
    });
  });
});
