import React from 'react';
import AdminListBtnGroup from '../common/admin_list_btngrp';

const AdminTableRow = (props) => {
  const { item, headers, buttons } = props;
  const button = buttons(props);
  return (
    <tr>
      {headers ? headers.map((header) => {
        const [display, mapKey] = header;
        return (<td key={mapKey.concat(display[0], item.id)}>{item[mapKey]}</td>);
      }) : ''}
      <td>
        <AdminListBtnGroup buttons={button} />
      </td>
    </tr>
  );
};

AdminTableRow.displayName = 'AdminTableRow';

export default AdminTableRow;
