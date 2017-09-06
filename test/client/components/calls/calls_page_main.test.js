import React from 'react';
import { shallow, mount } from 'enzyme';
import CallsPageMain from '../../../../public/src/components/calls/calls_page_main';

const props = {
  current_campaign: {
    title: 'Campaign title',
    description: 'this is a description'
  },
  current_script: {
    description: 'a script desc',
    body: 'a script body'
  },
  script_questions: [],
};
describe('<CallsPageMain />', () => {
  const wrapper = shallow(<CallsPageMain {...props} />);
  describe('rendering', () => {
    it('should render a <PageHeader>', () => {
      expect(wrapper.find('PageHeader').length).toBe(1);
    });
    it('should render a campaign description', () => {
      expect(wrapper.find('.lead').length).toBe(1);
    });
    it('should render a script description', () => {
      expect(wrapper.find('HelpBlock').length).toBe(1);
    });
    it('should render a script body in <Panel>', () => {
      expect(wrapper.find('Panel').length).toBe(1);
    });
    it('should render a <CallsForm>', () => {
      expect(wrapper.find('CallsForm').length).toBe(1);
    });
  });
});
