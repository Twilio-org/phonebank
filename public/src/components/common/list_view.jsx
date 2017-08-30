import React from 'react';
import { Table } from 'react-bootstrap';

import TableRow from './table_row';
import DashboardButtonGroup from './nav_btn_group';
import Banner from './welcome_banner';
import CreateNewButton from './createNew_btn';

const TableListView = (props) => {
  const { item_collection,
          account_info: { last_name, first_name, is_admin },
          history,
          button_collection,
          setCurrentItem,
          thisPage,
          tableHeaders,
          newPath,
          currentUser,
          auth } = props;

  const { headers } = tableHeaders;

  return (
    <div>
      <Banner
        first_name={first_name}
        last_name={last_name}
        is_admin={is_admin}
        history={history}
        page={thisPage}
      />
      <div>
        <DashboardButtonGroup
          is_admin={is_admin}
          page={thisPage.toLowerCase()}
          history={history}
        />
      </div>
      <Table responsive>
        <thead>
          <tr>{ is_admin && headers.length > 0 ? headers.map((header, index) => {
            const [display] = header;
            return (<th key={display.concat(index)}>{display}</th>);
          }) : null
            }
            <th /></tr>
        </thead>

        <tbody>
          {item_collection && item_collection.length ?
            item_collection.map(item =>
              (
                <TableRow
                  currentUser={currentUser}
                  key={item.id}
                  auth={auth}
                  is_admin={is_admin}
                  item={item}
                  handleClick={setCurrentItem}
                  buttons={button_collection}
                  page={thisPage}
                  headers={headers}
                  history={history}
                />
              )
            ) :
            (<tr />)
          }
        </tbody>
      </Table>
      {is_admin &&
        <div>
          <CreateNewButton
            history={history}
            page={thisPage}
            path={newPath}
          />
        </div>
      }
    </div>
  );
};

TableListView.displayName = 'TableListView';

export default TableListView;
