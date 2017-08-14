import React from 'react';
// import { Button, Table } from 'react-bootstrap';

const QuestionTableRow = (props) => {
  const { title, description, type, responses } = props.question;
  console.log('%%%%%',props.question);
  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>{type}</td>
      <td>{responses}</td>
      <td>Buttons to edit here</td>
    </tr>
  );
};

QuestionTableRow.displayName = 'QuestionTableRow';

export default QuestionTableRow;