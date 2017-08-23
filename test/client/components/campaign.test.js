import React from 'react';
import { shallow } from 'enzyme';
import CampaignPage from '../../../public/src/components/campaign/campaign';

describe('<CampaignPage />', () => {
  const props = {
    handleSubmit: jest.fn(),
    history: {
      goBack: jest.fn()
    },
    destroy: jest.fn(),
    saveNewCampaign: jest.fn()
  };
  const wrapper = shallow(<CampaignPage {...props} />);

  describe('Rendering', () => {
    it('1 form should be rendered', () => {
      expect(wrapper.find('form').length).toBe(1);
    });
    it('should render 3 fields when scripts and contact_lists are populated ', () => {
      expect(wrapper.find('Field').length).toBe(3);
    });
    it('should render 5 fields when scripts and contact_lists are populated ', () => {
      wrapper.setProps({ scripts: {}, contact_lists: {} });
      expect(wrapper.find('Field').length).toBe(5);
    });
    it('should render 1 button tool bar', () => {
      expect(wrapper.find('ButtonToolbar').length).toBe(1);
    });
    it('should render 5 buttons', () => {
      expect(wrapper.find('Button').length).toBe(5);
    });
  });
});
