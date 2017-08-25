import React from 'react';
import AdminListBtnGroup from '../common/admin_list_btngrp';

const AdminTableRow = (props) => {
  const { item, headers, buttons, history, page } = props;
  const { is_admin, is_banned, is_active } = item;
  const button = buttons(props);
  return (
    <tr>
      {headers ? headers.map((header) => {
        const [display, mapKey] = header;
        return (<td key={mapKey.concat(display[0], item.id)}>{item[mapKey]}</td>);
      }) : ''}
      <td>
        {page === 'User' ? (
          <AdminListBtnGroup
            history={history}
            buttons={button}
            page={page}
            admin={is_admin}
            banned={is_banned}
            active={is_active}
          />
        ) :
        (
          <AdminListBtnGroup
            history={history}
            buttons={button}
            page={page}
          />
        )
      }
      </td>
    </tr>
  );
};

AdminTableRow.displayName = 'AdminTableRow';

export default AdminTableRow;
