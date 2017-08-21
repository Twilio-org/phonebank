import React from 'react';
import { shallow } from 'enzyme';
import FieldGroup from '../../../../../public/src/components/common/form/field_group';

describe('<FieldGroup />', () => {
  const props = {
    label: 'Full Name',
    helpText: 'What is your full name?',
    name: 'full_name',
    type: 'text',
    placeholder: 'Full Name',
  };
  const touchedErrorProps = {
    meta: {
      touched: true,
      error: 'An error message!'
    }
  };
  const wrapper1 = shallow(<FieldGroup {...props} />);
  const wrapper2 = shallow(<FieldGroup {...props} {...touchedErrorProps} />);
  const wrapper3 = shallow(<FieldGroup />);

  describe('rendering', () => {
    describe('bootstrap components', () => {
      it('should render <FormGroup />', () => {
        expect(wrapper1.find('FormGroup').length).toBe(1);
      });
      it('should render <ControlLabel>', () => {
        expect(wrapper1.find('ControlLabel').length).toBe(1);
      });
      it('should render <FormControl>', () => {
        expect(wrapper1.find('FormControl').length).toBe(1);
      });
      it('should render <HelpBlock>', () => {
        expect(wrapper1.find('HelpBlock').length).toBe(1);
      });
      it('should render helpText in <HelpBlock>', () => {
        expect(wrapper1.find('HelpBlock').html()).toContain(props.helpText);
      });
      it('should not render <Popover> if not touched or errors present', () => {
        expect(wrapper1.find('Popover').length).toBe(0);
      });
      it('should render <Popover> if touched and errors present', () => {
        expect(wrapper2.find('Popover').length).toBe(1);
      });
      it('should render errorText in <Popover>', () => {
        expect(wrapper2.find('Popover').html()).toContain(touchedErrorProps.meta.error);
      });
    });
    describe('type = "text" vs. type = "textarea"', () => {
      it('should render <input> if type = "text"', () => {
        expect(wrapper1.html()).toContain('input type="text"');
      });
      it('should render a <textarea> if type = "textarea"', () => {
        wrapper1.setProps({ type: 'textarea' });
        expect(wrapper1.html()).toContain('</textarea>');
      });
    });
  });
  describe('props', () => {
    it('should not load props if no props', () => {
      expect(wrapper1.html()).not.toBe(wrapper3.html());
    });
  });
});
