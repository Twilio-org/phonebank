import React from 'react';
import { shallow } from 'enzyme';

import AdminTableRow from '../../../../public/src/components/common/admin_table_row';
import fixtures from '../../client_fixtures';
import { checkObjectProps } from '../../client_test_helpers';

const { campaigns: tableHeaders } = fixtures.tableHeaderFixtures;
const { mapFixture: item } = fixtures.scriptFixtures;
const { headers } = tableHeaders;

describe('Component testing for <AdminTableRow />: ', () => {
  const props = {
    item,
    headers,
    buttons: jest.fn()
  };
  const expectedProps = Object.keys(props);
  const expectedNumberOfTdElements = headers.length + 1;
  describe('Component rendering: ', () => {
    const wrapper = shallow(<AdminTableRow {...props} />);
    it('should have 1 tr element ', () => {
      const trElements = wrapper.find('tr').length;
      expect(trElements).toBe(1);
    });
    it(`should have ${expectedNumberOfTdElements} td elements `, () => {
      const tdElements = wrapper.find('td').length;
      expect(tdElements).toBe(expectedNumberOfTdElements);
    });
    it('should have 1 <AdminListBtnGroupElements /> ', () => {
      const adminListBtnGroupElements = wrapper.find('AdminListBtnGroup').length;
      expect(adminListBtnGroupElements).toBe(1);
    });
  });
  describe('<AdminTableRow /> expected props: ', () => {
    const wrapper = shallow(<AdminTableRow {...props} />).instance();
    it(`should have all of the expected props: ${expectedProps.join(', ')} `, () => {
      const actualProps = wrapper.props;
      expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
    });
  });
});

