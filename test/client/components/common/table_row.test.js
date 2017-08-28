import React from 'react';
import { shallow } from 'enzyme';

import TableRow from '../../../../public/src/components/common/table_row';
import fixtures from '../../client_fixtures';
import { checkObjectProps } from '../../client_test_helpers';

const { campaigns: tableHeaders } = fixtures.tableHeaderFixtures;
const { mapFixture: item } = fixtures.scriptFixtures;
const { headers } = tableHeaders;

describe('Component testing for <TableRow />: ', () => {
  const props = {
    item,
    headers,
    buttons: jest.fn(),
    is_admin: true
  };
  const expectedProps = Object.keys(props);
  const expectedNumberOfTdElements = headers.length + 1;
  describe('Component rendering: ', () => {
    const wrapper = shallow(<TableRow {...props} />);
    it('should have 1 tr element ', () => {
      const trElements = wrapper.find('tr').length;
      expect(trElements).toBe(1);
    });
    it(`should have ${expectedNumberOfTdElements} td elements `, () => {
      const tdElements = wrapper.find('td').length;
      expect(tdElements).toBe(expectedNumberOfTdElements);
    });
    it('should have 1 <ListBtnGroupElements /> ', () => {
      const ListBtnGroupElements = wrapper.find('ListBtnGroup').length;
      expect(ListBtnGroupElements).toBe(1);
    });
  });
  describe('<TableRow /> expected props: ', () => {
    const wrapper = shallow(<TableRow {...props} />).instance();
    it(`should have all of the expected props: ${expectedProps.join(', ')} `, () => {
      const actualProps = wrapper.props;
      expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
    });
  });
});
