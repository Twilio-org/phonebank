import React from 'react';
import AdminListBtnGroup from './admin_list_btngrp';

const ScriptsTableRow = (props) => {
  const { name, body, description, created_at, updated_at } = props.script;
  const { buttons } = props;
  const button = buttons(props);
  return (
    <tr>
      <td>{name}</td>
      <td>{body }</td>
      <td>{description}</td>
      <td>{created_at}</td>
      <td>{updated_at}</td>
      <td>
        <AdminListBtnGroup {...props} buttons={button} />
      </td>
    </tr>
  );
};

ScriptsTableRow.displayName = 'ScriptsTableRow';

export default ScriptsTableRow;
