import React from 'react';
import { shallow } from 'enzyme';
import CreateContactList from '../../../../public/src/components/contact_list/create_contact_list';

describe('<CreateContactList />', () => {
  const values = {};
  const props = {
    handleSubmit: jest.fn(),
    history: {
      goBack: jest.fn()
    },
    createContactList: jest.fn(),
    destroy: jest.fn()
  };
  const wrapper = shallow(<CreateContactList {...props}/>);

  describe('rendering', () => {
    it('should render <ContactListForm />', () => {
      expect(wrapper.find('ContactListForm').length).toBe(1);
    });
    it('should render an <PageHeader>', () => {
      expect(wrapper.find('PageHeader').length).toBe(1);
    });
  });
  describe('props', () => {
    const wrapperNoProps = shallow(<CreateContactList />);
    it('should return undefined if redux-form handleSubmit not in props', () => {
      expect(wrapperNoProps.instance().props.handleSubmit).toBe(undefined);
    });
  });
  describe('formSubmit()', () => {
    it('should call createQuestion action on formSubmit', () => {
      wrapper.instance().formSubmit(values);
      expect(props.createContactList).toBeCalled();
    });
  });
  describe('formCancel()', () => {
    it('should call destroy action on formCancel', () => {
      wrapper.instance().formCancel();
      expect(props.destroy).toBeCalled();
      expect(props.destroy).toBeCalledWith('CreateContactList');
    });
    it('should call goBack() on history', () => {
      wrapper.instance().formCancel();
      expect(props.history.goBack).toBeCalled();
    });
  });
  describe('formClear()', () => {
    it('should call destroy action on formClear', () => {
      wrapper.instance().formClear();
      expect(props.destroy).toBeCalled();
    });
  });
});
