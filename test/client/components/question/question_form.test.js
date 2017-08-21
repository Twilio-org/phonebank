import React from 'react';
import { shallow, mount } from 'enzyme';
import QuestionForm from '../../../../public/src/components/question/question_form';

describe('<QuestionForm />', () => {
  const props = {
    handleSubmit: jest.fn(),
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
    buttonText: 'Submit Button Text!!!'
  };
  const wrapper = shallow(<QuestionForm {...props}/>);

  describe('rendering', () => {
    it('should render 3 <Field /> components', () => {
      expect(wrapper.find('Field').length).toBeGreaterThan(2);
    });
    it('should render 2 <Button> components', () => {
      expect(wrapper.find('Button').length).toBe(2);
    });
    it('should render buttonText on submit <Button>', () => {
      const submit = wrapper.find('Button').first();
      expect(submit.html()).toContain(props.buttonText);
    });
    it('should render options if questionType = multiselect', () => {
      wrapper.setProps({ questionType: 'multiselect' });
      expect(wrapper.find('FieldArray').length).toBe(1);
    });
    it('should render options if questionType = singleselect', () => {
      wrapper.setProps({ questionType: 'singleselect' });
      expect(wrapper.find('FieldArray').length).toBe(1);
    });
    it('should not render options if questionType = paragraph', () => {
      wrapper.setProps({ questionType: 'paragraph' });
      expect(wrapper.find('Field').length).toBe(3);
    });
    it('should not render options if questionType = select', () => {
      wrapper.setProps({ questionType: 'select' } );
      expect(wrapper.find('Field').length).toBe(3);
    });
  });
  describe('props', () => {
    it('should return onSubmit if in props', () => {
      expect(wrapper.instance().props.onSubmit).toBe(props.onSubmit);
    });
    it('should return onCancel if in props', () => {
      expect(wrapper.instance().props.onCancel).toBe(props.onCancel);
    });
    it('should return buttonText if in props', () => {
      expect(wrapper.instance().props.buttonText).toBe('Submit Button Text!!!');
    });
  });
  describe('Form Submit', () => {
    it('should call handleSubmit on form submit', () => {
      wrapper.simulate('submit');
      expect(props.handleSubmit).toBeCalled();
    });
  });
  describe('Cancel Button onClick', () => {
    it('should call onCancel when cancel button is clicked', () => {
      const cancelButton = wrapper.find('Button').last();
      cancelButton.simulate('click');
      expect(props.onCancel).toBeCalled();
    });
  });
});
