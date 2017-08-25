import React from 'react';
import { shallow, mount } from 'enzyme';
import ContactListForm from '../../../../public/src/components/contact_list/contact_list_form';

describe('<ContactListForm />', () => {
  const props = {
    handleSubmit: jest.fn(),
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
    onClear: jest.fn()
  };
  const wrapper = shallow(<ContactListForm {...props}/>);

  describe('rendering', () => {
    it('should render 2 <Field /> components', () => {
      expect(wrapper.find('Field').length).toBe(2);
    });
    it('should render 3 <Button> components', () => {
      expect(wrapper.find('Button').length).toBe(3);
    });
    it('should render buttonText on submit <Button>', () => {
      const submit = wrapper.find('Button').first();
      expect(submit.html()).toContain(props.buttonText);
    });
  });
  describe('props', () => {
    it('should return onSubmit if in props', () => {
      expect(wrapper.instance().props.onSubmit).toBe(props.onSubmit);
    });
    it('should return onCancel if in props', () => {
      expect(wrapper.instance().props.onCancel).toBe(props.onCancel);
    });
    it('should return onClear if in props', () => {
      expect(wrapper.instance().props.onClear).toBe(props.onClear);
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
