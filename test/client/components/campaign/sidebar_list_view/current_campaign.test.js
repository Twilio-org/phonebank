import React from 'react';
import { shallow } from 'enzyme';
import CurrentCampaign from '../../../../../public/src/components/campaign/sidebar_list_view/current_campaign';

const propsJoinedCampaign = {
  defaultMsg: 'Test',
  userId: 1,
  currentCampaign: {
    id: 1,
    title: 'Campaign',
    status: 'active',
    description: 'Lorem ipsum'
  },
  list: [],
  history: {
    push: jest.fn()
  },
  initiatTwilioCall: jest.fn(),
  volunteerCallActive: false
};

const propsNoJoinedCampaigns = {
  defaultMsg: 'Test',
  userId: 2,
  currentCampaign: {},
  list: [],
  history: {
    push: jest.fn()
  },
  initiatTwilioCall: jest.fn(),
  volunteerCallActive: false
};

describe('<CurrentCampaign />', () => {
  describe('rendering with no joined campaigns', () => {
    const wrapper = shallow(<CurrentCampaign {...propsNoJoinedCampaigns} />);
    it('should render 1 div with id "join-campaign-message"', () => {
      expect(wrapper.find('div#join-campaign-message').length).toBe(1);
    });
    it('should not render campaign title', () => {
      expect(wrapper.find('h3').length).toBe(0);
    });
    it('should not render campaign description', () => {
      expect(wrapper.find('p.lead').text()).toBe(propsJoinedCampaign.defaultMsg);
    });
    it('should not render 1 <Button>', () => {
      expect(wrapper.find('Button').length).toBe(0);
    });
  });
  describe('rendering with joined campaigns', () => {
    const wrapper = shallow(<CurrentCampaign {...propsJoinedCampaign} />);
    it('should not render 1 div with id "join-campaign-message"', () => {
      expect(wrapper.find('div#join-campaign-message').length).toBe(0);
    });
    it('should render campaign title', () => {
      expect(wrapper.find('h3').text()).toBe(propsJoinedCampaign.currentCampaign.title);
    });
    it('should render campaign description', () => {
      expect(wrapper.find('p.lead').text()).toBe(propsJoinedCampaign.currentCampaign.description);
    });
    it('should render 1 <Button>', () => {
      expect(wrapper.find('Button').length).toBe(1);
    });
  });
});

