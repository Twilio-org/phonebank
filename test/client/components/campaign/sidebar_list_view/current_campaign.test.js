import React from 'react';
import { shallow, mount } from 'enzyme';
import CurrentCampaign from '../../../../../public/src/components/campaign/sidebar_list_view/current_campaign';

const props = {
  defaultMsg: 'Test',
  id:'test',
  campaign: {
    id: 1,
    title: 'Campaign',
    status: 'active',
    description: 'Lorem ipsum'
  }
};
describe('<CurrentCampaign />', () => {
  const wrapper = shallow(<CurrentCampaign {...props} />);
  describe('rendering', () => {
    it('should render 1 div with id "test"', () => {
      expect(wrapper.find('div#test').length).toBe(1);
    });
    it('should render campaign title', () => {
      expect(wrapper.find('h3').text()).toBe(props.campaign.title);
    });
    it('should render campaign description', () => {
      expect(wrapper.find('p.lead').text()).toBe(props.campaign.description);
    });
    it('should render 1 <Button>', () => {
      expect(wrapper.find('Button').length).toBe(1);
    });
  });
});
