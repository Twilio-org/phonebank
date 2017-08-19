import { campaignFormReducer, SET_CAMPAIGN_FORM_SCRIPT, SET_CAMPAIGN_FORM_CONTACT_LIST } from '../../../public/src/reducers/create_campaign';

import fixtures from '../client_fixtures';

const { defaultScriptsContactsForm: initialState } = fixtures.campaignFixtures;
const { listFixture: scriptListFixtures } = fixtures.scriptFixtures;
const { listFixture: contactListFixtures } = fixtures.contactListFixtures;

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
const expectedScriptProps = Object.keys(scriptListFixtures);
const expectedContactListProps = Object.keys(contactListFixtures);

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

  describe('case matching and handling payload', () => {
    let testResult;
    describe('should populate scripts array when "SET_CAMPAIGN_FORM_SCRIPT" is called', () => {
      testResult = campaignFormReducer(initialState, script);
      const { scripts } = testResult;
      const [first, second, third] = scripts;
      it('scripts should be a non-empty array', () => {
        expect(scripts.length).toBe(expectedScriptProps.length);
      });
      it('scripts name should correspond to mock data', () => {
        expect(first.name).toBe('Script 1');
        expect(second.name).toBe('Script 2');
        expect(third.name).toBe('Script 3');
      });
    });

    describe('should populate contactList array when "SET_CAMPAIGN_FORM_CONTACT_LIST" is called', () => {
      testResult = campaignFormReducer(initialState, contactList);
      const { contact_lists } = testResult;
      const [first, second, third] = contact_lists;
      it('contact_lists should be a non-empty array', () => {
        expect(contact_lists.length).toBe(expectedContactListProps.length);
      });
      it('contact_lists name should correspond to mock data', () => {
        expect(first.name).toBe('ContactList1');
        expect(second.name).toBe('ContactList2');
        expect(third.name).toBe('ContactList3');
      });
    });

    describe('it should handle non-matching action types: ', () => {
      it('should return the default if action type doesn\'t match', () => {
        testResult = campaignFormReducer(initialState, fake);
        expect(testResult).toEqual(initialState);
      });
    });
  });
});
