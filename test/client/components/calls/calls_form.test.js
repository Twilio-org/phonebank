import React from 'react';
import { shallow, mount } from 'enzyme';
import CallsForm from '../../../../public/src/components/calls/calls_form';

const props = {
  questions: [{ title: '1' }, { title: '2' }, { title: '3' }],
  change: jest.fn(),
  form: 'Form',
  call_active: false
};
describe('<CallsForm />', () => {
  const wrapper = shallow(<CallsForm {...props} />);
  describe('rendering', () => {
    it('should render a <form>', () => {
      expect(wrapper.find('form').length).toBe(1);
    });
    it('should render a <fieldset>', () => {
      expect(wrapper.find('fieldset').length).toBe(1);
    });
    it('should render 3 <CallQuestion>s', () => {
      expect(wrapper.find('CallQuestion').length).toBe(props.questions.length);
    });
  });
});
