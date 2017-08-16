import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'npm ';

import { saveNewCampaign, setCampaignsList, setCurrentCampaign, fetchAllCampaigns } from '../../../public/src/actions/campaign';
import { SET_CAMPAIGNS, SET_CAMPAIGN_CURRENT } from '../../../public/src/reducers/campaign';

describe('campaign actions', () => {
  describe('setCampaignsList: ', () => {
    const campaignFixtures = [
      {
        id: 1,
        name: 'Campaign 3',
        title: 'Campaign 3 Title',
        description: 'ice cream',
        status: 'active',
        contact_lists_id: 1,
        script_id: 1,
        updated_at: '4321',
        created_at: '1234'
      },
      {
        id: 2,
        name: 'Campaign 3',
        title: 'Campaign 3 Title',
        description: 'ice cream',
        status: 'active',
        contact_lists_id: 2,
        script_id: 2,
        updated_at: '4321',
        created_at: '1234'
      },
      {
        id: 3,
        name: 'Campaign 3',
        title: 'Campaign 3 Title',
        description: 'ice cream',
        status: 'active',
        contact_lists_id: 3,
        script_id: 3,
        updated_at: '4321',
        created_at: '1234'
      }
    ];
    const setCampaingsListResult = setCampaignsList(campaignFixtures);
    describe('type: ', () => {
      it('should have the type property "SET_CAMPAIGNS"', () => {
        expect(setCampaingsListResult.type).toEqual('SET_CAMPAIGNS');
      });
    });
    describe('payload: ', () => {
      it('should have a payload that is an array of objects: ', () => {
        expect(Array.isArray(setCampaingsListResult.payload)).toBe(true);
      });
      it('should contain 3 objects', () => {
        expect(setCampaingsListResult.length).toBe(3);
        it('should each have the following properties: ', () => {
          const expectedProps = ['id', 'name', 'title', 'description', 'status', 'contact_lists_id', 'script_id', 'updated_at', 'created_at'];
          const firstCampaign = setCampaingsListResult[0];
          const firstObjectProps = expectedProps.reduce((accum, curr) => {
            const propertyExists = Object.prototype.hasOwnProperty.call(firstCampaign, curr);
            return accum && propertyExists;
          }, true);
          const secondObjectProps = expectedProps.reduce((accum, curr) => {
            const propertyExists = Object.prototype.hasOwnProperty.call(firstCampaign, curr);
            return accum && propertyExists;
          }, true);
          const thirdObjectProps = expectedProps.reduce((accum, curr) => {
            const propertyExists = Object.prototype.hasOwnProperty.call(firstCampaign, curr);
            return accum && propertyExists;
          }, true);
          expect(thirdObjectProps && secondObjectProps && firstObjectProps).toBe(true);
        });
      });
    });
  });
});
