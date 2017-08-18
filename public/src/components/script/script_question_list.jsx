import React from 'react';

const QuestionList = (props) => {
  const { question } = props;

  return (
    <li>{question.title}
      <ul>
        <li>Description: {question.description}</li>
        <li>Type: {question.type}</li>
        <li>Responses: {question.responses ? question.responses : 'Text Paragraph'}</li>
      </ul>
    </li>
  );
};

export default QuestionList;

