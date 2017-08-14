import React from 'react';
import QuestionsButtonGroup from './questions_btngrp';

const QuestionTableRow = (props) => {
  const { title, description, type, responses, created_at, updated_at } = props.question;
  
  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>{type}</td>
      <td>{responses}</td>
      <td>{created_at}</td>
      <td>{updated_at}</td>
      <td> <QuestionsButtonGroup {...props} /></td>
    </tr>
  );
};

QuestionTableRow.displayName = 'QuestionTableRow';

export default QuestionTableRow;
