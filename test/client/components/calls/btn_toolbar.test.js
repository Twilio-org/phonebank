import React from 'react';
import { shallow } from 'enzyme';

import Toolbar from '../../../../public/src/components/calls/btn_toolbar';

import { checkObjectProps } from '../../client_test_helpers';

describe('Component testing for <Toolbar />: ', () => {
  describe('<Toolbar /> component testing: ', () => {
    const props = {
      outcomes: [
        {
          value: 'Answered',
          style: 'success'
        },
        {
          value: 'Bad Number',
          style: 'danger'
        },
        {
          value: 'Do Not Call',
          style: 'danger'
        }
      ],
      hanldeOutcomes: jest.fn()
    };
    const expectedProps = Object.keys(props);

    describe('Component rendering: ', () => {
      const wrapper = shallow(<Toolbar {...props} />);

      it('should have 1 div element: ', () => {
        const numberOfDivElements = wrapper.find('div').length;
        expect(numberOfDivElements).toBe(1);
      });
      it('should have 1 ButtonToolbar components: ', () => {
        const numberOfButtonToolbar = wrapper.find('ButtonToolbar').length;
        expect(numberOfButtonToolbar).toBe(1);
      });
      const { outcomes } = props;
      const expectedComponents = outcomes.length;
      it(`should have ${expectedComponents} ToggleButton components: `, () => {
        const numToggleButton = wrapper.find('ToggleButton').length;
        expect(numToggleButton).toBe(expectedComponents);
      });
    });

    describe('Expected props: ', () => {
      const wrapper = shallow(<Toolbar {...props} />).instance();

      it(`should have all of the expected props: ${expectedProps.join(', ')}`, () => {
        const actualProps = wrapper.props;
        expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
      });
    });
  });
});
