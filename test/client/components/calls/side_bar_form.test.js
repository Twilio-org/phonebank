import React from 'react';
import { shallow } from 'enzyme';

import SideBarForm from '../../../../public/src/components/calls/side_bar_form';

import { checkObjectProps } from '../../client_test_helpers';

describe('Component testing for <SideBarForm />: ', () => {
  describe('<SideBarForm /> component testing: ', () => {
    const props = {
      handleSubmit: jest.fn()
    };
    const expectedProps = Object.keys(props);

    describe('Component rendering: ', () => {
      const wrapper = shallow(<SideBarForm {...props} />);

      it('should have 1 div element: ', () => {
        const numberOfDivElements = wrapper.find('div').length;
        expect(numberOfDivElements).toBe(1);
      });
      it('should have 1 form components: ', () => {
        const numberOfForms = wrapper.find('form').length;
        expect(numberOfForms).toBe(1);
      });
      it('should have 1 Hr component: ', () => {
        const numHr = wrapper.find('hr').length;
        expect(numHr).toBe(1);
      });
      it('should have 1 Row component: ', () => {
        const numRow = wrapper.find('Row').length;
        expect(numRow).toBe(1);
      });
      it('should have 1 Col component: ', () => {
        const numCol = wrapper.find('Col').length;
        expect(numCol).toBe(1);
      });
      it('should have 1 Field component: ', () => {
        const numField = wrapper.find('Field').length;
        expect(numField).toBe(1);
      });
    });

    describe('Expected props: ', () => {
      const wrapper = shallow(<SideBarForm {...props} />).instance();

      it(`should have all of the expected props: ${expectedProps.join(', ')}`, () => {
        const actualProps = wrapper.props;
        expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
      });
    });
  });
});
