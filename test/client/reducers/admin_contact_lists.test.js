import { adminContactListsReducer, SET_CAMPAIGN_FORM_CONTACT_LIST, SET_CURRENT_CONTACT_LIST } from '../../../public/src/reducers/admin_contact_lists';

import fixtures from '../client_fixtures';

// TO-DO: this needs to become the contact list reducer test since this is all this is testing.
const { listFixture: contactListFixtures,
        defaultContactLists: initialState,
        mapFixture: contactListFixture } = fixtures.contactListFixtures;

const mockCampaignFormActions = [
  {
    type: SET_CAMPAIGN_FORM_CONTACT_LIST,
    payload: contactListFixtures
  },
  {
    type: SET_CURRENT_CONTACT_LIST,
    payload: contactListFixture
  },
  {
    type: 'RANDOM_TYPE',
    payload: 'nothing'
  }
];

const [contactList, currentContactList, fake] = mockCampaignFormActions;
const expectedContactListProps = Object.keys(contactListFixtures);
const expectedCurrentContactList = Object.keys(contactListFixture);

describe('adminContactListsReducer tests: ', () => {
  // describe('default behavior', () => {
  //   will become default testing for the contacct list reducer
  // });
  let testResult;
  describe('should populate contactList array when "SET_CAMPAIGN_FORM_CONTACT_LIST" is called', () => {
    testResult = adminContactListsReducer(initialState, contactList);
    const { contact_lists } = testResult;
    const [first, second, third] = contact_lists;
    it('contact_lists should be a non-empty array', () => {
      expect(contact_lists.length).toBe(expectedContactListProps.length);
    });
    it('contact_lists name should correspond to mock data', () => {
      expect(first.name).toBe(contactListFixtures[0].name);
      expect(second.name).toBe(contactListFixtures[1].name);
      expect(third.name).toBe(contactListFixtures[2].name);
    });
  });

  describe('should populate current_contact_list when "SET_CURRENT_CONTACT_LIST" is called', () => {
    testResult = adminContactListsReducer(initialState, currentContactList);
    const { current_contact_list } = testResult;
    it('should set current_contact_list as an object', () => {
      expect(Array.isArray(current_contact_list)).toBe(false);
      expect(typeof current_contact_list).toBe('object');
    });
    it('should have all of expected properties', () => {
      expect(Object.keys(current_contact_list)).toEqual(expectedCurrentContactList);
    });
  });

  describe('it should handle non-matching action types: ', () => {
    it('should return the default if action type doesn\'t match', () => {
      testResult = adminContactListsReducer(initialState, fake);
      expect(testResult).toEqual(initialState);
    });
  });
});
