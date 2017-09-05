import React from 'react';
import { shallow, mount } from 'enzyme';
import JoinedCampaigns from '../../../../public/src/components/campaign/joined_campaigns';

const props = {
  history: {
    goBack: jest.fn(),
    location: { pathname: ''}
  },
  auth: { id: 1 },
  fetchCampaignsByUser: jest.fn(),
  current_campaign: {},
  joined_campaigns: [],
  account_info: {
    first_name: "Test",
    last_name: "Tests"
  },
  setCurrentCampaign: jest.fn()
};
describe('<JoinedCampaigns />', () => {
  describe('rendering', () => {
    const wrapper = shallow(<JoinedCampaigns {...props} />);
    it('should render 1 <Banner>', () => {
      expect(wrapper.find('Banner').length).toBe(1);
    });
    it('should render 1 <DashboardButtonGroup>', () => {
      expect(wrapper.find('DashboardButtonGroup').length).toBe(1);
    });
    it('should render 1 <SidebarList>', () => {
      expect(wrapper.find('SidebarList').length).toBe(1);
    });
  });
  describe('Mounting', () => {
    it('Should call the fetchQuestion action on mount', () => {
      mount(<JoinedCampaigns {...props} />);
      expect(props.fetchCampaignsByUser).toHaveBeenCalled();
    });
  });
  describe('<CurrentCampaign> render switch', () => {
    it('should render 1 <CurrentCampaign> when elements are present in current_campaign prop', () => {
      const campaignsPresentProps = {
        history: {
          goBack: jest.fn(),
          location: { pathname: ''}
        },
        auth: { id: 1 },
        fetchCampaignsByUser: jest.fn(),
        current_campaign: {},
        joined_campaigns: [1],
        account_info: {
          first_name: "Test",
          last_name: "Tests"
        },
        setCurrentCampaign: jest.fn()
      };
      const wrapper = shallow(<JoinedCampaigns {...campaignsPresentProps} />);
      expect(wrapper.find('CurrentCampaign').length).toBe(1);
    });
    it('should render 0 <CurrentCampaign> when no elements are present in current_campaign prop', () => {
      const wrapper = shallow(<JoinedCampaigns {...props} />);
      expect(wrapper.find('CurrentCampaign').length).toBe(0);
    });
  });
});
