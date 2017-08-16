import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { destroy } from 'redux-form';


import { saveNewCampaign, setCampaignsList, setCurrentCampaign, fetchAllCampaigns } from '../../../public/src/actions/campaign';

// Mock Store setup:
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  all_campaigns: [],
  current_campaign: {}
};
// mock local storage
const localStorageMock = (() => {
  let localstore = {};
  return {
    getItem(key) {
      return localstore[key];
    },
    setItem(key, value) {
      localstore[key] = value.toString();
    },
    clear() {
      localstore = {};
    }
  };
})();

global.localStorage = localStorageMock;
let mock;

describe('campaign actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  function checkObjectProps(obj) {
    const expectedCampaignProps = ['id', 'name', 'title', 'description', 'status', 'contact_lists_id', 'script_id', 'updated_at', 'created_at'];
    return expectedCampaignProps.reduce((accum, curr) => {
      const propertyExists = Object.prototype.hasOwnProperty.call(obj, curr);
      return accum && propertyExists;
    }, true);
  }

  const campaignListFixtures = [
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
  const campaignFixture = {
    id: 3,
    name: 'Campaign 3',
    title: 'Campaign 3 Title',
    description: 'ice cream',
    status: 'active',
    contact_lists_id: 3,
    script_id: 3,
    updated_at: '4321',
    created_at: '1234'
  };

  describe('setCampaignsList: ', () => {
    const setCampaingsListResult = setCampaignsList(campaignListFixtures);
    describe('type: ', () => {
      const { type } = setCampaingsListResult;
      it('should have a type property (not undefined): ', () => {
        expect(type).toBeDefined();
      });
      it('should have the type property "SET_CAMPAIGNS"', () => {
        expect(type).toEqual('SET_CAMPAIGNS');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = setCampaingsListResult;
      it('should have a payload that is an array of objects: ', () => {
        expect(Array.isArray(payload)).toBe(true);
      });
      it('should contain 3 objects', () => {
        const firstObjectProps = checkObjectProps(payload[0]);
        const secondObjectProps = checkObjectProps(payload[1]);
        const thirdObjectProps = checkObjectProps(payload[2]);
        expect(payload.length).toBe(3);
        expect(thirdObjectProps && secondObjectProps && firstObjectProps).toBe(true);
      });
    });
  });

  describe('setCurrentCampaign', () => {
    const setCurrentCampaignResult = setCurrentCampaign(campaignFixture);
    describe('type: ', () => {
      const { type } = setCurrentCampaignResult;
      it('should have a type property (not undefined): ', () => {
        expect(type).toBeDefined();
      });
      it('should have a value of "SET_CAMPAIGN_CURRENT": ', () => {
        expect(type).toBe('SET_CAMPAIGN_CURRENT');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = setCurrentCampaignResult;
      it('should have a payload that is an object: ', () => {
        expect(Array.isArray(payload)).toBe(false);
        expect(typeof payload).toBe('object');
      });
      it('should have all properties: ', () => {
        expect(checkObjectProps(payload)).toBe(true);
        expect(Object.keys(payload).length).toBe(9);
      });
    });
  });

  describe('fetchAllCampaigns: ', () => {
    mock = new MockAdapter(axios);

    beforeEach(() => {
      mock.onGet('/campaigns').reply(200, campaignListFixtures
      );
    });
    afterEach(() => {
      mock.reset();
    });
    describe('axios GET request: ', () => {
      it('should add the appropriate action to the store: ', () => {
        const expectedAction = setCampaignsList(campaignListFixtures);
        return store.dispatch(fetchAllCampaigns())
          .then(() => {
            const dispatchedActions = store.getActions();
            const { type, payload } = dispatchedActions[0];
            expect(dispatchedActions[0]).toEqual(expectedAction);
            expect(type).toBe('SET_CAMPAIGNS');
            expect(payload).toEqual(campaignListFixtures);
          });
      });
    });
  });

  describe('saveNewCampaign: ', () => {
    mock = new MockAdapter(axios);

    beforeEach(() => {
      mock.onPost('/campaigns').reply(201, campaignFixture);
    });
    afterEach(() => {
      mock.reset();
    });
    describe('axios POST request: ', () => {
      it('save campaign should add the destroy action to the store: ', () => {
        const expectedAction = destroy('CampaignPage');
        const history = {
          goBack: jest.fn()
        };
        return store.dispatch(saveNewCampaign([campaignFixture], history))
          .then(() => {
            const dispatchedActions = store.getActions();
            const { type, meta } = dispatchedActions[0];
            expect(dispatchedActions[0]).toEqual(expectedAction);
            expect(type).toBe('@@redux-form/DESTROY');
            expect(meta).toEqual({
              form: [
                'CampaignPage'
              ]
            });
          });
      });
    });
  });
});
