import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../../../../../public/src/components/common/form/dropdown';

describe('<Dropdown />', () => {
  const props = {
    label: 'Do you have pets?',
    helpText: 'e.x dog, cats, fish, birds, hamsters, bunnies',
    name: 'pets',
    options: [
      {value: 'yes', label: 'Yes'},
      {value: 'no', label: 'No'},
      {value: 'maybe', label: 'Maybe'}
    ],
    meta: {
      touched: false
    }
  };
  const touchedErrorProps = {
    meta: {
      touched: true,
      error: 'An error message!'
    }
  };
  const metaProps = {
    meta: {
      touched: false
    }
  };
  const wrapper1 = shallow(<Dropdown {...props} />);
  const wrapper2 = shallow(<Dropdown {...props} {...touchedErrorProps} />);
  const wrapper3 = shallow(<Dropdown {...metaProps} />);

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
  });
  describe('props', () => {
    it('should not load props if no props', () => {
      expect(wrapper1.html()).not.toBe(wrapper3.html());
    });
  });
  describe('renderOptions()', () => {
    it('should render options', () => {
      expect(wrapper1.html()).toContain(props.options[0].label);
      expect(wrapper1.html()).toContain(props.options[1].label);
      expect(wrapper1.html()).toContain(props.options[2].label);
    });
    it('should render <option>\'s + 1 for "select"', () => {
      expect(wrapper1.find('option').length).toBe(props.options.length + 1);
    });
  });
});
