import { adminContactListsReducer, SET_CAMPAIGN_FORM_CONTACT_LIST } from '../../../public/src/reducers/admin_contact_lists';

import fixtures from '../client_fixtures';

// TO-DO: this needs to become the contact list reducer test since this is all this is testing.
const { listFixture: contactListFixtures,
        defaultContactLists: initialState } = fixtures.contactListFixtures;

const mockCampaignFormActions = [
  {
    type: SET_CAMPAIGN_FORM_CONTACT_LIST,
    payload: contactListFixtures
  },
  {
    type: 'RANDOM_TYPE',
    payload: 'nothing'
  }
];

const [contactList, fake] = mockCampaignFormActions;
const expectedContactListProps = Object.keys(contactListFixtures);

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
      expect(first.name).toBe('ContactList1');
      expect(second.name).toBe('ContactList2');
      expect(third.name).toBe('ContactList3');
    });
  });

  describe('it should handle non-matching action types: ', () => {
    it('should return the default if action type doesn\'t match', () => {
      testResult = adminContactListsReducer(initialState, fake);
      expect(testResult).toEqual(initialState);
    });
  });
});
