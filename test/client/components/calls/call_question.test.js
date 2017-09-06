import React from 'react';
import { shallow, mount } from 'enzyme';
import CallQuestion from '../../../../public/src/components/calls/call_question';

const singleSelect = {
  question_id: 1,
  description: 'A description',
  responses: 'yes, no, maybe',
  type: 'singleselect'
};
const multiSelect = {
  question_id: singleSelect.question_id,
  description: singleSelect.description,
  responses: singleSelect.responses,
  type: 'multiselect'
};
const props1 = {
  question: singleSelect,
  change: jest.fn(),
  form: 'Form'
};
const props2 = {
  question: multiSelect,
  change: jest.fn(),
  form: 'Forms'
}
describe('<CallQuestion />', () => {
  const wrapper1 = shallow(<CallQuestion {...props1} />);
  const wrapper2 = shallow(<CallQuestion {...props2} />);
  describe('rendering general', () => {
    it('should render a description in <ControlLabel>', () => {
      expect(wrapper1.find('ControlLabel').first().html()).toContain(props1.question.description);
    });
    it('should render a <Badge>', () => {
      expect(wrapper1.find('Badge').length).toBe(1);
    });
  });
  describe('rendering a single select', () => {
    it('should render 3 <Field>', () => {
      expect(wrapper1.find('Field').length).toBe(3);
    });
    it('should render 3 <label>s', () => {
      expect(wrapper1.find('label').length).toBe(3);
    });
    it('should render radio buttons', () => {
      const field = wrapper1.find('Field').last();
      expect(field.props().type).toBe('radio');
    });
  });
  describe('rendering a multi-select', () => {
    it('should render 3 <Field>', () => {
      expect(wrapper2.find('Field').length).toBe(3);
    });
    it('should render 3 <label>s', () => {
      expect(wrapper2.find('label').length).toBe(3);
    });
    it('should render checkboxes', () => {
      const field = wrapper2.find('Field').last();
      expect(field.props().type).toBe('checkbox');
    });
  });
});
