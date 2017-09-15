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
const paragraph = {
  question_id: singleSelect.question_id,
  description: singleSelect.description,
  responses: '',
  type: 'paragraph'
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
const props3 = {
  question: paragraph,
  change: jest.fn(),
  form: 'Forms'
};
describe('<CallQuestion />', () => {
  const wrapper1 = shallow(<CallQuestion {...props1} />);
  const wrapper2 = shallow(<CallQuestion {...props2} />);
  describe('rendering a single select', () => {
    it('should render a <FieldArray>', () => {
      expect(wrapper1.find('FieldArray').length).toBe(1);
    });
  });
  describe('rendering a multi-select', () => {
    it('should render a <FieldArray>', () => {
      expect(wrapper2.find('FieldArray').length).toBe(1);
    });
  });
  describe('rendering a paragraph', () => {
    it('should render a <Field>', () => {
      wrapper2.setProps(props3);
      expect(wrapper2.find('Field').length).toBe(1);
    });
  });
});
