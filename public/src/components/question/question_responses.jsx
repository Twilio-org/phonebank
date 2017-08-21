import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Field } from 'redux-form';
import FieldGroup from '../common/form/field_group';

const QuestionResponses = (props) => {
  const { name } = props;
  return (
    <Row>
      <Col md={12}>
        <h2>Responses</h2>
        {[1, 2, 3, 4, 5].map(i =>
          (<Field
            key={i}
            type="text"
            label={`Option ${i}`}
            component={FieldGroup}
            name={`${name}.option${i}`}
            placeholder={`Option ${i}`}
          />)
        )}
      </Col>
    </Row>
  );
};
export default QuestionResponses;

QuestionResponses.defaultProps = {
  name: 'responses'
};
