import React from 'react';
import { shallow } from 'enzyme';

import DashboardButtonGroup from '../../../../public/src/components/common/nav_btn_group';
import { checkObjectProps } from '../../client_test_helpers';

describe('Component testing for <DashboardButtonGroup />: ', () => {
  const props = {
    history: { push: jest.fn() },
    is_admin: true
  };
  const expectedProps = Object.keys(props);

  describe('Component rendering: ', () => {
    const wrapper = shallow(<DashboardButtonGroup {...props} />);
    it('should render 1 <ButtonGroup /> component ', () => {
      const buttonGroupElements = wrapper.find('ButtonGroup').length;
      expect(buttonGroupElements).toBe(1);
    });
    it('should render 3 Button elements ', () => {
      const buttonElements = wrapper.find('Button').length;
      expect(buttonElements).toBe(4);
    });
  });
  describe('Expected props for <DashboardButtonGroup /> ', () => {
    const wrapper = shallow(<DashboardButtonGroup {...props} />).instance();
    it(`should have expected props: ${expectedProps.join(', ')} `, () => {
      const actualProps = wrapper.props;
      expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
    });
  });
});
