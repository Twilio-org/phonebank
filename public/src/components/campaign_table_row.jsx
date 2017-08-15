import React from 'react';
import AdminListBtnGroup from './admin_list_btngrp';

const CampaignTableRow = (props) => {
  const { name, title, description, status, script_id,
          created_at, contact_lists_id } = props.campaign;
  const { buttons } = props;
  const button = buttons(props);
  return (
    <tr>
      <td>{name}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{status}</td>
      <td>{script_id}</td>
      <td>{contact_lists_id}</td>
      <td>{created_at}</td>
      <td>
        <AdminListBtnGroup {...props} buttons={button} />
      </td>
    </tr>
  );
};

CampaignTableRow.displayName = 'CampaignTableRow';

export default CampaignTableRow;
