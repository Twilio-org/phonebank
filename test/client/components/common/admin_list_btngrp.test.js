import React from 'react';
import { shallow } from 'enzyme';

import ListBtnGroup from '../../../../public/src/components/common/list_btngrp';
import fixtures from '../../client_fixtures';
import buttons from '../../../../public/src/components/common/button_objs'
import { checkObjectProps } from '../../client_test_helpers';

const { view_edit } = buttons;
const { mapFixture: item } = fixtures.scriptFixtures;

describe('Component testing for <ListBtnGroup /> ', () => {
  const setupProps = {
    view_edit,
    item,
    page: 'Page',
    handleClick: jest.fn(),
    is_admin: true
  }
  const buttons = view_edit(setupProps);
  const props = {
    buttons
  };
  const expectedProps = Object.keys(props);
  const expectedNumberOfButtons = props.buttons.length;

  describe('Component rendering: ', () => {
    const wrapper = shallow(<ListBtnGroup {...props} />);
    it('should have 1 <ButtonGroup> component ', () => {
      const buttonGroupElements = wrapper.find('ButtonGroup').length;
      expect(buttonGroupElements).toBe(1);
    });
    it(`should have ${expectedNumberOfButtons} Button elements `, () => {
      const buttonElements = wrapper.find('Button').length;
      expect(buttonElements).toBe(expectedNumberOfButtons);
    });
  });

  describe('<ListBtnGroup /> expected props: ', () => {
    const wrapper = shallow(<ListBtnGroup {...props} />).instance();
    it(`should have all of the expected props: ${expectedProps.join(', ')}`, () => {
      const acctualProps = wrapper.props;
      expect(checkObjectProps(expectedProps, acctualProps)).toBe(true);
    });
  });
});
