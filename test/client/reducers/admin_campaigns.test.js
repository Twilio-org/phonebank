import { campaignListReducer, SET_CAMPAIGNS, SET_CAMPAIGN_CURRENT } from '../../../public/src/reducers/campaign';

describe('campaignListReducer tests: ', () => {
  describe('default behavior', () => {
    const expectedState = {
      all_campaigns: [],
      current_campaign: {}
    };
    const defaultState = campaignListReducer(undefined, {});
    const { all_campaigns, current_campaign } = defaultState;
    it('should return the default state if the action type does not match any cases: ', () => {
      expect(defaultState).toEqual(expectedState);
    });
    it('should have a property named all_campaigns which is an empty array: ', () => {
      expect(!!all_campaigns).toBe(true);
      expect(Array.isArray(all_campaigns)).toBe(true);
      expect(!!all_campaigns.length).toBe(false);
    });
    it('should have a property named current_campaign which is an empty object: ', () => {
      expect(!!all_campaigns).toBe(true);
      expect(typeof current_campaign).toBe('object');
      expect(!Array.isArray(current_campaign)).toBe(true);
      expect(!!Object.keys(current_campaign).length).toBe(false);
    });
  });

  describe('case matching and handling payload: ', () => {
    const SET_CAMPAIGN_DATE = 'SET_CAMPAIGN_DATE';
    const testActions = [
      {
        type: SET_CAMPAIGNS,
        payload: [
          {
            name: 'hatch',
            title: 'meow',
            description: 'meow meow',
            status: 'active',
            script_id: 2,
            created_at: '1234-2345',
            id: 1
          },
          {
            name: 'hatch',
            title: 'meow',
            description: 'meow meow',
            status: 'active',
            script_id: 3,
            created_at: '1234-2345',
            id: 2
          },
          {
            name: 'andi',
            title: 'meow',
            description: 'meow meow',
            status: 'active',
            script_id: 4,
            created_at: '1234-2345',
            id: 7
          },
          {
            name: 'hatch',
            title: 'meow',
            description: 'meow meow',
            status: 'active',
            script_id: 5,
            created_at: '1234-2345',
            id: 4
          }
        ]
      },
      {
        type: SET_CAMPAIGN_CURRENT,
        payload: {
          name: 'hatch',
          title: 'meow',
          description: 'meow meow',
          status: 'active',
          script_id: 5,
          created_at: '1234-2345',
          id: 4
        }
      },
      {
        type: SET_CAMPAIGN_DATE,
        payload: 'this should not run'
      }
    ];

    describe('Should add an array of campaign all_campaigns when \'SET_CAMPAIGNS\' is called: ', () => {
      const testResult = campaignListReducer({}, testActions[0]);
      const { all_campaigns } = testResult;
      it('should update all_campaigns to be an array of campaigns: ', () => {
        expect(all_campaigns.length).toBe(4);
      });
      it('should not update current_campaign: ', () => {
        expect(!!testResult.current_campaign).toBe(false);
      });
    });

    describe('should add a campaign object to current_campaign when \'SET_CAMPAIGN_CURRENT\' is called: ', () => {
      const testResult2 = campaignListReducer({}, testActions[1]);
      const { current_campaign } = testResult2;
      it('should update current campaign with a (non-empty) campaign object', () => {
        expect(current_campaign).toEqual(testActions[1].payload);
        expect(!!Object.keys(current_campaign).length).toBe(true);
      });
      it('should have properties: name, title, description, status, script_id, created_at, id: ', () => {
        const props = ['name', 'title', 'description', 'status', 'script_id', 'created_at', 'id'];
        const allProps = props.reduce((accum, curr) => {
          const propertyExists = Object.prototype.hasOwnProperty.call(current_campaign, curr);
          return accum && propertyExists;
        }, true);
        expect(allProps).toBe(true);
      });
    });

    describe('it should handle non-matching action types: ', () => {
      const defaultState = {
        all_campaigns: [],
        current_campaign: {}
      };
      it('should return the default if the action type is not a case in the reducer: ', () => {
        const testResult3 = campaignListReducer(defaultState, testActions[2]);
        expect(testResult3).toEqual(defaultState);
      });
    });
  });
});
