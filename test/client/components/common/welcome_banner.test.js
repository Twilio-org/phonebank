import React from 'react';
import { shallow } from 'enzyme';

import Banner from '../../../../public/src/components/common/welcome_banner';
import fixtures from '../../client_fixtures';
import { checkObjectProps } from '../../client_test_helpers';

const { mapFixture: account_info } = fixtures.accountFixtures;

const { first_name, last_name } = account_info;

describe('Component testing for <Banner />: ', () => {
  const props = {
    first_name,
    last_name,
    page: 'Page'
  };
  const expectedProps = Object.keys(props);

  describe('Component rendering: ', () => {
    const wrapper = shallow(<Banner {...props} />);
    it('should have 1 div element ', () => {
      const divElements = wrapper.find('div').length;
      expect(divElements).toBe(1);
    });
    it('should have 1 h2 element ', () => {
      const h2Elements = wrapper.find('h2').length;
      expect(h2Elements).toBe(1);
    });
  });

  describe('Expected props for <Banner />: ', () => {
    const wrapper = shallow(<Banner {...props} />).instance();
    it(`should have the expected props: ${expectedProps.join(', ')} `, () => {
      const actualProps = wrapper.props;
      expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
    });
  });
});
