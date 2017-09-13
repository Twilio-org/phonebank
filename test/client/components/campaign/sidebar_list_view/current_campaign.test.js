import React from 'react';
import { shallow } from 'enzyme';
import CurrentCampaign from '../../../../../public/src/components/campaign/sidebar_list_view/current_campaign';

const props = {
  defaultMsg: 'Test',
  userId: 1,
  currentCampaign: {
    id: 'test',
    title: 'Campaign',
    status: 'active',
    description: 'Lorem ipsum'
  },
  history: {
    push: jest.fn()
  },
  initiatTwilioCall: jest.fn(),
  volunteerCallActive: false
};
describe('<CurrentCampaign />', () => {
  const wrapper = shallow(<CurrentCampaign {...props} />);
  describe('rendering', () => {
    it('should render 1 div with id "test"', () => {
      expect(wrapper.find('div#test').length).toBe(1);
    });
    it('should render campaign title', () => {
      expect(wrapper.find('h3').text()).toBe(props.currentCampaign.title);
    });
    it('should render campaign description', () => {
      expect(wrapper.find('p.lead').text()).toBe(props.currentCampaign.description);
    });
    it('should render 1 <Button>', () => {
      expect(wrapper.find('Button').length).toBe(1);
    });
  });
});
