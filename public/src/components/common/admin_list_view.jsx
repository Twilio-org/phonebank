import React from 'react';
import { Table } from 'react-bootstrap';

import AdminTableRow from './admin_table_row';
import AdminDashboardButtonGroup from './admin_nav_btn_group';
import AdminBanner from './admin_welcome_banner';
import CreateNewButton from './admin_createNew_btn';

const TableListView = (props) => {
  const { item_collection,
          account_info: { last_name, first_name },
          account_info,
          history,
          button_collection,
          setCurrentItem,
          thisPage,
          tableHeaders,
          newPath } = props;
  const { headers } = tableHeaders;

  return (
    <div>
      <AdminBanner
        first_name={first_name}
        last_name={last_name}
        history={history}
        page={thisPage}
      />
      <div>
        <AdminDashboardButtonGroup page={thisPage.toLowerCase()} history={history} />
      </div>
      <Table responsive>
        <thead>
          <tr>
            {
              headers.length > 0 ? headers.map((header, index) => {
                const [display] = header;
                return (
                  <th key={display.concat(index)}>{display}</th>);
              }) : null
            }
            <th />
          </tr>
        </thead>

        <tbody>
          {item_collection && item_collection.length ?
            item_collection.map(item =>
              (
                <AdminTableRow
                  key={item.id}
                  item={item}
                  handleClick={setCurrentItem}
                  buttons={button_collection}
                  page={thisPage}
                  headers={headers}
                  history={history}
                  account_info={account_info}
                />
              )
            ) :
            (<tr />)
          }
        </tbody>
      </Table>
      <div>
        <CreateNewButton
          history={history}
          page={thisPage}
          path={newPath}
        />
      </div>
    </div>
  );
};

TableListView.displayName = 'TableListView';

export default TableListView;
