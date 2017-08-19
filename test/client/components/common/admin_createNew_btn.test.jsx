import React from 'react';
import { shallow } from 'enzyme';

import CreateNewButton from '../../../../public/src/components/common/admin_createNew_btn';
import { checkObjectProps } from '../../client_test_helpers';

describe('Component testing for <CreateNewButton /> ', () => {
  const props = {
    page: 'Page',
    history: {
      push: jest.fn()
    }
  };
  const expectedProps = Object.keys(props);

  describe('Component rendering: ', () => {
    const wrapper = shallow(<CreateNewButton {...props} />);
    it('should render 1 div element ', () => {
      const divElements = wrapper.find('div').length;
      expect(divElements).toBe(1);
    });
    it('should render 1 Button element', () => {
      const buttonElements = wrapper.find('Button').length;
      expect(buttonElements).toBe(1);
    });
  });

  describe('Expected props: ', () => {
    const wrapper = shallow(<CreateNewButton {...props} />).instance();
    it(`should have the expected props: ${expectedProps.join(', ')}`, () => {
      const actualProps = wrapper.props;
      expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
    });
  });
});
