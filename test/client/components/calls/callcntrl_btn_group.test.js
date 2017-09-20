import React from 'react';
import { shallow } from 'enzyme';

import CallControlButton from '../../../../public/src/components/calls/callcntrl_btn';

import { checkObjectProps } from '../../client_test_helpers';

describe('Component testing for <CallControl />: ', () => {
  describe('<CallControlButton /> component testing: ', () => {
    const props = {
      outcome: 'PENDING',
      call_active: false,
      handleHangUp: jest.fn(),
      submitHandler: jest.fn()
    };
    const expectedProps = Object.keys(props);

    describe('Component rendering: ', () => {
      const wrapper = shallow(<CallControlButton {...props} />);
      it('should have 1 Button components: ', () => {
        const numberOfButtons = wrapper.find('Button').length;
        expect(numberOfButtons).toBe(1);
      });
    });

    describe('Expected props: ', () => {
      const wrapper = shallow(<CallControlButton {...props} />).instance();

      it(`should have all of the expected props: ${expectedProps.join(', ')}`, () => {
        const actualProps = wrapper.props;
        expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
      });
    });
  });
});
