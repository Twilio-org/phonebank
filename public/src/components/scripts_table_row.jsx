import React from 'react';
// import { Button, Table } from 'react-bootstrap';

const ScriptsTableRow = (props) => {
  const { name, body, description, created_at, updated_at } = props.script;

  return (
    <tr>
      <td>{name}</td>
      <td>{body }</td>
      <td>{description}</td>
      <td>{created_at}</td>
      <td>{updated_at}</td>

    </tr>
  );
};

ScriptsTableRow.displayName = 'ScriptsTableRow';

export default ScriptsTableRow;
