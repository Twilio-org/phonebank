import { campaignListReducer, SET_CAMPAIGNS, SET_CAMPAIGN_CURRENT } from '../../../public/src/reducers/campaign';

import fixtures from '../client_fixtures';
import { checkObjectProps, isObjectEmpty } from '../client_test_helpers';

const { defaultCampaigns: initialState,
        listFixture: campaignListFixtures,
        mapFixture: campaignFixture } = fixtures.campaignFixtures;

const mockQuestionActions = [
  {
    type: SET_CAMPAIGNS,
    payload: campaignListFixtures
  },
  {
    type: SET_CAMPAIGN_CURRENT,
    payload: campaignFixture
  },
  {
    type: 'SET_CAMPAIGN_DATE',
    payload: 'this should not run'
  }
];

const [all, one, fake] = mockQuestionActions;
const numOfCampaigns = campaignListFixtures.length;
const expectedCampaignProps = Object.keys(campaignFixture);

describe('campaignListReducer tests: ', () => {
  describe('default behavior', () => {
    const defaultState = campaignListReducer(undefined, {});
    const { all_campaigns, current_campaign } = defaultState;
    it('should return the default state if the action type does not match any cases: ', () => {
      expect(defaultState).toEqual(initialState);
    });
    it('should have a property named all_campaigns which is an empty array: ', () => {
      expect(!!all_campaigns).toBe(true);
      expect(Array.isArray(all_campaigns)).toBe(true);
      expect(!!all_campaigns.length).toBe(false);
    });
    it('should have a property named current_campaign which is an empty object: ', () => {
      expect(typeof current_campaign).toBe('object');
      expect(!Array.isArray(current_campaign)).toBe(true);
      expect(isObjectEmpty(current_campaign)).toBe(true);
    });
  });

  describe('case matching and handling payload: ', () => {
    let testResult;
    describe('Should add an array of campaign all_campaigns when "SET_CAMPAIGNS" is called: ', () => {
      testResult = campaignListReducer(initialState, all);
      const { all_campaigns, current_campaign } = testResult;
      it('should update all_campaigns to be an array of campaigns: ', () => {
        expect(all_campaigns.length).toBe(numOfCampaigns);
      });
      it('should not update current_campaign: ', () => {
        expect(isObjectEmpty(current_campaign)).toBe(true);
      });
    });

    describe('should add a campaign object to current_campaign when "SET_CAMPAIGN_CURRENT" is called: ', () => {
      testResult = campaignListReducer(initialState, one);
      const { current_campaign, all_campaigns } = testResult;
      it('should update current campaign with a (non-empty) campaign object', () => {
        const { payload } = one;
        expect(current_campaign).toEqual(payload);
        expect(isObjectEmpty(current_campaign)).toBe(false);
      });
      it('should have properties: name, title, description, status, script_id, created_at, id: ', () => {
        expect(checkObjectProps(expectedCampaignProps, current_campaign)).toBe(true);
      });
      it('should not update all_campaigns: ', () => {
        expect(isObjectEmpty(all_campaigns)).toBe(true);
      });
    });

    describe('it should handle non-matching action types: ', () => {
      it('should return the default if the action type is not a case in the reducer: ', () => {
        testResult = campaignListReducer(initialState, fake);
        expect(testResult).toEqual(initialState);
      });
    });
  });
});
