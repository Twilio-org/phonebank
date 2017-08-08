import React from 'react';
// import { Button, Table } from 'react-bootstrap';

const TableRow = (props) => {
  const { name, title, description, status, script_id, created_at, id } = props.campaign;
  console.log(id);
  return (
    // rewrite as a .map function
    <tr>
      <td>{name}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{status}</td>
      <td>{script_id}</td>
      <td>{created_at}</td>
    </tr>
  );
};

TableRow.displayName = 'TableRow';

export default TableRow;
