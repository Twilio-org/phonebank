import React from 'react';
import { shallow } from 'enzyme';

import AdminListBtnGroup from '../../../../public/src/components/common/admin_list_btngrp';
import fixtures from '../../client_fixtures';
import buttons from '../../../../public/src/components/common/admin_button_objs'
import { checkObjectProps } from '../../client_test_helpers';

const { view_edit } = buttons;
const { mapFixture: item } = fixtures.scriptFixtures;

describe('Component testing for <AdminListBtnGroup /> ', () => {
  const setupProps = {
    view_edit,
    item,
    page: 'Page',
    handleClick: jest.fn()
  }
  const buttons = view_edit(setupProps);
  const props = {
    buttons
  };
  const expectedProps = Object.keys(props);
  const expectedNumberOfButtons = props.buttons.length;

  describe('Component rendering: ', () => {
    const wrapper = shallow(<AdminListBtnGroup {...props} />);
    it('should have 1 <ButtonGroup> component ', () => {
      const buttonGroupElements = wrapper.find('ButtonGroup').length;
      expect(buttonGroupElements).toBe(1);
    });
    it(`should have ${expectedNumberOfButtons} Button elements `, () => {
      const buttonElements = wrapper.find('Button').length;
      expect(buttonElements).toBe(expectedNumberOfButtons);
    });
  });

  describe('<AdminListBtnGroup /> expected props: ', () => {
    const wrapper = shallow(<AdminListBtnGroup {...props} />).instance();
    it(`should have all of the expected props: ${expectedProps.join(', ')}`, () => {
      const acctualProps = wrapper.props;
      expect(checkObjectProps(expectedProps, acctualProps)).toBe(true);
    });
  });
});