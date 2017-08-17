import React from 'react';
import { Table } from 'react-bootstrap';

import AdminTableRow from './admin_table_row';
import AdminDashboardButtonGroup from './admin_nav_btn_group';
import AdminBanner from './admin_welcome_banner';
import CreateNewButton from './admin_createNew_btn';

const TableListView = (props) => {
  const { item_collection,
          account_info: { last_name, first_name },
          history,
          button_collection,
          setCurrentItem,
          thisPage,
          tableHeaders,
          newPath } = props;

  return (
    <div>
      <AdminBanner
        first_name={first_name}
        last_name={last_name}
        history={history}
        page={thisPage}
      />
      <div>
        <AdminDashboardButtonGroup history={history} />
      </div>
      <Table responsive>
        <thead>
          <tr>
            {
              tableHeaders.length > 0 ? tableHeaders.map((header, index) => {
                const [display] = header;
                return (<th key={display.concat(index)}>display</th>);
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
                  handleEditClick={setCurrentItem}
                  buttons={button_collection}
                  page={thisPage}
                  headers={tableHeaders.headers}
                />
              )
            ) :
            (<tr />)
          }
        </tbody>
      </Table>
      <div>
        <CreateNewButton {...props} page={thisPage} path={newPath} />
      </div>
    </div>
  );
};

TableListView.displayName = 'TableListView';

export default TableListView;
