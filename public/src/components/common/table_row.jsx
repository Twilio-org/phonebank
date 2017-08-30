import React from 'react';
import ListBtnGroup from './list_btngrp';

const TableRow = (props) => {
  const { buttons, history, item, is_admin: admin_status, page, currentUser } = props;
  const { is_admin, is_banned, is_active } = item;
  let { headers } = props;
  const button = buttons(props);

  if (!admin_status) {
    headers = headers.filter(header => header[1] === 'title');
  }

  return (
    <tr>
      {headers ? headers.map((header) => {
        const [display, mapKey] = header;
        return (
          <td key={mapKey.concat(display[0], item.id)}>
            {item[mapKey]}
          </td>
        );
      }) : ''}
      <td>
        {page === 'User' ? (
          <ListBtnGroup
            history={history}
            buttons={button}
            page={page}
            admin={is_admin}
            banned={is_banned}
            active={is_active}
            currentUserId={currentUser}
          />
        ) : (
          <ListBtnGroup
            history={history}
            buttons={button}
            page={page}
          />

        )}
      </td>
    </tr>
  );
};

TableRow.displayName = 'TableRow';

export default TableRow;
