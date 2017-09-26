import React, { Component } from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';
import QuestionForm from './question_form';

export default class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.formCancel = this.formCancel.bind(this);
  }
  formSubmit(values) {
    const { history } = this.props;
    this.props.createQuestion(values, history);
  }
  formCancel() {
    this.props.history.goBack();
    this.props.destroy('CreateQuestion');
  }
  render() {
    const storeProps = this.props;
    return (
      <Row className="admin-form">
        <Col xs={12} mdOffset={3} md={6}>
          <PageHeader>Create a Question</PageHeader>
          <QuestionForm onSubmit={this.formSubmit} onCancel={this.formCancel} buttonText={'Create Question'} {...storeProps} />
        </Col>
      </Row>
    );
  }
}
