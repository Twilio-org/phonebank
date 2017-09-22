import React from 'react';
import { shallow } from 'enzyme';

import PreCallButtonGroup from '../../../../public/src/components/calls/pre_call_btn_grp';

import { checkObjectProps } from '../../client_test_helpers';

describe('Component testing for <PreCallButtonGroup />: ', () => {
  describe('<PreCallButtonGroup /> component testing: ', () => {
    const props = {
      call_id: 1,
      campaign_id: 1,
      clearUserCallSID: jest.fn(),
      contact_name: 'tom waits',
      history: {
        push: jest.fn()
      },
      nextCall: jest.fn(),
      releaseCall: jest.fn(),
      updateAttempt: jest.fn(),
      updateCallStatus: jest.fn(),
      user_id: 1
    };
    const expectedProps = Object.keys(props);

    describe('Component rendering: ', () => {
      const wrapper = shallow(<PreCallButtonGroup {...props} />);

      it('should have 5 div element: ', () => {
        const numberOfDivElements = wrapper.find('div').length;
        expect(numberOfDivElements).toBe(5);
      });
      it('should have 4 Button components: ', () => {
        const numberOfButtons = wrapper.find('Button').length;
        expect(numberOfButtons).toBe(4);
      });
      it('should have 1 ButtonGroup component: ', () => {
        const numButtonGroup = wrapper.find('ButtonGroup').length;
        expect(numButtonGroup).toBe(1);
      });
    });

    describe('Component rendering with no available calls', () => {
      const specialProps = {
        call_id: 1,
        campaign_id: 1,
        clearUserCallSID: jest.fn(),
        contact_name: 'tom waits',
        history: {
          push: jest.fn()
        },
        nextCall: jest.fn(),
        disable_call_control: true,
        releaseCall: jest.fn(),
        updateAttempt: jest.fn(),
        updateCallStatus: jest.fn(),
        user_id: 11
      };
      const wrapper = shallow(<PreCallButtonGroup {...specialProps} />);

      it('should have only 2 div element: ', () => {
        const numberOfDivElements = wrapper.find('div').length;
        expect(numberOfDivElements).toBe(2);
      });
    });

    describe('Expected props: ', () => {
      const wrapper = shallow(<PreCallButtonGroup {...props} />).instance();

      it(`should have all of the expected props: ${expectedProps.join(', ')}`, () => {
        const actualProps = wrapper.props;
        expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
      });
    });
  });
});
