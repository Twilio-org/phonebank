import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { destroy } from 'redux-form';

import { mockStore, exposeLocalStorageMock, checkObjectProps } from '../client_test_helpers';
import fixtures from '../client_fixtures';
import { saveNewCampaign, setCampaignsList, setJoinedCampaignsList, setCurrentCampaign, fetchCampaigns, fetchCampaignsByUser } from '../../../public/src/actions/campaign';

exposeLocalStorageMock();

const { defaultScripts: initialState,
        listFixture: campaignListFixtures,
        mapFixture: campaignFixture } = fixtures.campaignFixtures;

describe('campaign actions', () => {
  let mock;
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  const expectedCampaignProps = Object.keys(campaignFixture);
  const numberOfProps = expectedCampaignProps.length;

  describe('setCampaignsList: ', () => {
    const setCampaignsListResult = setCampaignsList(campaignListFixtures);
    describe('type: ', () => {
      const { type } = setCampaignsListResult;
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
      const { payload } = setCampaignsListResult;
      it('should have a payload that is an array of objects: ', () => {
        expect(Array.isArray(payload)).toBe(true);
      });
      it('should contain 3 objects', () => {
        const firstObjectProps = checkObjectProps(expectedCampaignProps, payload[0]);
        const secondObjectProps = checkObjectProps(expectedCampaignProps, payload[1]);
        const thirdObjectProps = checkObjectProps(expectedCampaignProps, payload[2]);
        expect(payload.length).toBe(3);
        expect(thirdObjectProps && secondObjectProps && firstObjectProps).toBe(true);
      });
    });
  });

  describe('setJoinedCampaignsList: ', () => {
    const setCampaignsListResult = setJoinedCampaignsList(campaignListFixtures);
    describe('type: ', () => {
      const { type } = setCampaignsListResult;
      it('should have a type property (not undefined): ', () => {
        expect(type).toBeDefined();
      });
      it('should have the type property "SET_VOLUNTEER_JOINED_CAMPAIGNS"', () => {
        expect(type).toEqual('SET_VOLUNTEER_JOINED_CAMPAIGNS');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = setCampaignsListResult;
      it('should have a payload that is an array of objects: ', () => {
        expect(Array.isArray(payload)).toBe(true);
      });
      it('should contain 3 objects', () => {
        const firstObjectProps = checkObjectProps(expectedCampaignProps, payload[0]);
        const secondObjectProps = checkObjectProps(expectedCampaignProps, payload[1]);
        const thirdObjectProps = checkObjectProps(expectedCampaignProps, payload[2]);
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
        expect(checkObjectProps(expectedCampaignProps, payload)).toBe(true);
        expect(Object.keys(payload).length).toBe(numberOfProps);
      });
    });
  });

  describe('fetchCampaigns: ', () => {
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
        return store.dispatch(fetchCampaigns())
          .then(() => {
            const [dispatchedActions] = store.getActions();
            const { type, payload } = dispatchedActions;
            expect(dispatchedActions).toEqual(expectedAction);
            expect(type).toBe('SET_CAMPAIGNS');
            expect(payload).toEqual(campaignListFixtures);
          });
      });
    });
  });

  describe('fetchCampaignsByUser: ', () => {
    mock = new MockAdapter(axios);

    beforeEach(() => {
      mock.onGet('/users/1/campaigns').reply(200, campaignListFixtures
      );
    });
    afterEach(() => {
      mock.reset();
    });
    describe('axios GET request: ', () => {
      it('should add the appropriate action to the store: ', () => {
        const expectedAction = setJoinedCampaignsList(campaignListFixtures);
        return store.dispatch(fetchCampaignsByUser(1))
          .then(() => {
            const [dispatchedActions] = store.getActions();
            const { type, payload } = dispatchedActions;
            expect(dispatchedActions).toEqual(expectedAction);
            expect(type).toBe('SET_VOLUNTEER_JOINED_CAMPAIGNS');
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
      it('save campaign should add the destroy action to the store and call goBack from history: ', () => {
        const expectedAction = destroy('CampaignPage');
        const history = {
          goBack: jest.fn()
        };
        return store.dispatch(saveNewCampaign([campaignFixture], history))
          .then(() => {
            const [dispatchedActions] = store.getActions();
            const { type, meta } = dispatchedActions;
            expect(dispatchedActions).toEqual(expectedAction);
            expect(type).toBe('@@redux-form/DESTROY');
            expect(meta).toEqual({
              form: [
                'CampaignPage'
              ]
            });
            expect(history.goBack).toHaveBeenCalled();
          });
      });
    });
  });
});
