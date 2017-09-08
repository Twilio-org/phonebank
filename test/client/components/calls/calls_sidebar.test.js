import React from 'react';
import { shallow } from 'enzyme';

import CallsSideBar from '../../../../public/src/components/calls/calls_sidebar';

import { checkObjectProps } from '../../client_test_helpers';

describe('Component testing for <CallsSideBar />: ', () => {
  describe('<CallsSideBar /> component testing: ', () => {
    const constantProps = {
      call_id: 1,
      campaign_id: 1,
      clearUserCallSID: jest.fn(),
      contact_id: 1,
      current_call_contact_name: 'tom waits',
      getCallContactInfo: jest.fn(),
      handleSubmit: jest.fn(),
      history: {
        push: jest.fn()
      },
      inactivateCall: jest.fn(),
      nextCall: jest.fn(),
      releaseCall: jest.fn(),
      updateAttempt: jest.fn(),
      updateCallOutcome: jest.fn(),
      updateCallStatus: jest.fn(),
      call_volunteer_active: false
    };

    describe('Component and Prop tests for when status is ASSIGNED: ', () => {
      const fluxProps = {
        user_id: 1,
        call_volunteer_active: true,
        outcome: 'PENDING',
        status: 'ASSIGNED'
      };
      const props = { ...constantProps, ...fluxProps };
      const expectedProps = Object.keys(props);

      describe('Component rendering: ', () => {
        const wrapper = shallow(<CallsSideBar {...props} />);

        it('should have one <PreCallButtonGroup /> element: ', () => {
          const numberOfElements = wrapper.find('PreCallButtonGroup').length;
          expect(numberOfElements).toBe(1);
        });
      });

      describe('Expected props: ', () => {
        const wrapper = shallow(<CallsSideBar {...props} />).instance();

        it(`should have all of the expected props: ${expectedProps.join(', ')}`, () => {
          const actualProps = wrapper.props;
          expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
        });
      });
    });

    describe('Component and Prop tests when status is IN_PROGRESS or ATTEMPTED', () => {
      const fluxProps = {
        user_id: 1,
        call_volunteer_active: true,
        outcome: 'PENDING',
        status: 'IN_PROGRESS'
      };
      const props = { ...constantProps, ...fluxProps };
      const expectedProps = Object.keys(props);

      describe('Component rendering: ', () => {
        const wrapper = shallow(<CallsSideBar {...props} />);
        it('should have 1 ActiveCallControl componen: ', () => {
          const numActiveCallControl = wrapper.find('ActiveCallControl').length;
          expect(numActiveCallControl).toBe(1);
        });
      });

      describe('Expected props: ', () => {
        const wrapper = shallow(<CallsSideBar {...props} />).instance();

        it(`should have all of the expected props: ${expectedProps.join(', ')}`, () => {
          const actualProps = wrapper.props;
          expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
        });
      });
    });
  });
});
