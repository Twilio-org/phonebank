import React from 'react';
import { shallow } from 'enzyme';

import CallControl from '../../../../public/src/components/calls/callcntrl_btn_group';

import { checkObjectProps } from '../../client_test_helpers';

describe('Component testing for <CallControl />: ', () => {
  describe('<CallControl /> component testing: ', () => {
    const props = {
      outcome: 'PENDING',
      call_active: false,
      handleHangUp: jest.fn(),
      submitHandler: jest.fn()
    };
    const expectedProps = Object.keys(props);

    describe('Component rendering: ', () => {
      const wrapper = shallow(<CallControl {...props} />);

      it('should have 1 div element: ', () => {
        const numberOfDivElements = wrapper.find('div').length;
        expect(numberOfDivElements).toBe(1);
      });
      it('should have 1 Button components: ', () => {
        const numberOfButtons = wrapper.find('Button').length;
        expect(numberOfButtons).toBe(1);
      });
    });

    describe('Expected props: ', () => {
      const wrapper = shallow(<CallControl {...props} />).instance();

      it(`should have all of the expected props: ${expectedProps.join(', ')}`, () => {
        const actualProps = wrapper.props;
        expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
      });
    });
  });
});
