import React from 'react';
import AdminListBtnGroup from '../common/admin_list_btngrp';

const QuestionTableRow = (props) => {
  const { title, description, type, responses, created_at, updated_at } = props.question;
  const { buttons } = props;
  const button = buttons(props);
  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>{type}</td>
      <td>{responses}</td>
      <td>{created_at}</td>
      <td>{updated_at}</td>
      <td>
        <AdminListBtnGroup {...props} buttons={button} />
      </td>
    </tr>
  );
};

QuestionTableRow.displayName = 'QuestionTableRow';

export default QuestionTableRow;
