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
  const wrapper = shallow(<JoinedCampaigns {...props} />);
  describe('rendering', () => {
    it('should render 1 <Banner>', () => {
      expect(wrapper.find('Banner').length).toBe(1);
    });
    it('should render 1 <DashboardButtonGroup>', () => {
      expect(wrapper.find('DashboardButtonGroup').length).toBe(1);
    });
    it('should render 1 <SidebarList>', () => {
      expect(wrapper.find('SidebarList').length).toBe(1);
    });
    it('should render 1 <CurrentCampaign>', () => {
      expect(wrapper.find('CurrentCampaign').length).toBe(1);
    });
  });
  describe('Mounting', () => {
    it('Should call the fetchQuestion action on mount', () => {
      mount(<JoinedCampaigns {...props} />);
      expect(props.fetchCampaignsByUser).toHaveBeenCalled();
    });
  });
});
