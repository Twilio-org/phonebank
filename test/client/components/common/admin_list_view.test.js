import React from 'react';
import { shallow } from 'enzyme';

import TableListView from '../../../../public/src/components/common/admin_list_view';
import fixtures from '../../client_fixtures';
import { checkObjectProps } from '../../client_test_helpers';

const { mapFixture: account_info } = fixtures.accountFixtures;
const { campaigns: tableHeaders } = fixtures.tableHeaderFixtures;
const { listFixture: item_collection } = fixtures.scriptFixtures;

describe('Component testing for <TableListView />: ', () => {
  const props = {
    item_collection,
    account_info,
    history: {
      goBack: jest.fn(),
      push: jest.fn()
    },
    button_collection: {},
    setCurrentItem: jest.fn(),
    thisPage: 'meow',
    tableHeaders,
    newPath: 'meooow'
  };
  const { headers } = tableHeaders;
  const expectedProps = Object.keys(props);
  const expectedNumberOfRows = item_collection.length;
  const expectedNumberOfTableHeaders = headers.length + 1;

  describe('Component rendering: ', () => {
    const wrapper = shallow(<TableListView {...props} />);
    it('should have 3 div elements', () => {
      const divElements = wrapper.find('div').length;
      expect(divElements).toBe(3);
    });
    it('should have 1 <AdminBanner /> elements ', () => {
      const adminBannerElements = wrapper.find('AdminBanner').length;
      expect(adminBannerElements).toBe(1);
    });
    it('should have 1 <AdminDashboardButtonGroup /> element ', () => {
      const adminDashboardBtnGrpElements = wrapper.find('AdminDashboardButtonGroup').length;
      expect(adminDashboardBtnGrpElements).toBe(1);
    });
    it(`should have ${expectedNumberOfRows} <AdminTableRow /> elements `, () => {
      const adminTableRowElements = wrapper.find('AdminTableRow').length;
      expect(adminTableRowElements).toBe(expectedNumberOfRows);
    });
    it('should have 1 <CreateNewButton /> elements ', () => {
      const createNewButtonElements = wrapper.find('CreateNewButton').length;
      expect(createNewButtonElements).toBe(1);
    });
    it('should have 1 Table element ', () => {
      const tableElements = wrapper.find('Table').length;
      expect(tableElements).toBe(1);
    });
    it(`should have ${expectedNumberOfTableHeaders} th elements `, () => {
      const thElements = wrapper.find('th').length;
      expect(thElements).toBe(expectedNumberOfTableHeaders);
    });
    it('should have 1 thead element ', () => {
      const theadElements = wrapper.find('thead').length;
      expect(theadElements).toBe(1);
    });
    it('should have 1 tbody element ', () => {
      const tbodyElements = wrapper.find('tbody').length;
      expect(tbodyElements).toBe(1);
    });
  });

  describe('<TableListView /> expected props: ', () => {
    const wrapper = shallow(<TableListView {...props} />).instance();
    it(`should have all of the expected props: ${expectedProps.join(', ')}`, () => {
      const acctualProps = wrapper.props;
      expect(checkObjectProps(expectedProps, acctualProps)).toBe(true);
    });
  });
});
