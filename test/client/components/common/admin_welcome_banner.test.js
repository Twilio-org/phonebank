import React from 'react';
import { shallow } from 'enzyme';

import AdminBanner from '../../../../public/src/components/common/admin_welcome_banner';
import fixtures from '../../client_fixtures';
import { checkObjectProps } from '../../client_test_helpers';

const { mapFixture: account_info } = fixtures.accountFixtures;

const { first_name, last_name } = account_info;

describe('Component testing for <AdminBanner />: ', () => {
  const props = {
    first_name,
    last_name,
    page: 'Page'
  };
  const expectedProps = Object.keys(props);

  describe('Component rendering: ', () => {
    const wrapper = shallow(<AdminBanner {...props} />);
    it('should have 1 div element ', () => {
      const divElements = wrapper.find('div').length;
      expect(divElements).toBe(1);
    });
    it('should have 1 h2 element ', () => {
      const h2Elements = wrapper.find('h2').length;
      expect(h2Elements).toBe(1);
    });
  });

  describe('Expected props for <AdminBanner />: ', () => {
    const wrapper = shallow(<AdminBanner {...props} />).instance();
    it(`should have the expected props: ${expectedProps.join(', ')} `, () => {
      const acctualProps = wrapper.props;
      expect(checkObjectProps(expectedProps, acctualProps)).toBe(true);
    });
  });
});
