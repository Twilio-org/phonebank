import React, { Component } from 'react';
import { PageHeader, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class ViewQuestion extends Component {
  constructor(props) {
    super(props);
    this.getTypeIconName = this.getTypeIconName.bind(this);
    this.renderResponseOptions = this.renderResponseOptions.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchQuestion(id);
  }
  getTypeIconName() {
    const { type } = this.props.current_question;
    if (type === 'paragraph') {
      return 'format_align_left';
    } else if (type === 'singleselect') {
      return 'radio_button_checked';
    }
    return 'check_box';
  }
  renderResponseOptions() {
    const { responses, type } = this.props.current_question;
    const icon = type === 'singleselect' ? 'radio_button_unchecked' : 'check_box_outline_blank';
    return responses.map((option, i) => (<li key={`option-${option + i}`}>
      <i className="material-icons small">{icon}</i>
      {` ${option}`}
    </li>));
  }
  render() {
    const { title, description, type, responses } = this.props.current_question;
    const typeLabel = type ? type.replace(/\b\w/g, l => l.toUpperCase()) : '';
    return (
      <div>
        <PageHeader>Question</PageHeader>
        <ListGroup>
          <ListGroupItem header="Title (Internal)">{title}</ListGroupItem>
          <ListGroupItem header="Description">
            <span className="lead">{description}</span>
          </ListGroupItem>
          <ListGroupItem header="Type">
            {type &&
              <span>
                <i className="material-icons small">{this.getTypeIconName()}</i>
                {` ${typeLabel}`}
              </span>}
          </ListGroupItem>
          {responses &&
            <li className="list-group-item">
              <h4 className="list-group-item-heading">Responses</h4>
              <ul className="list-unstyled">{this.renderResponseOptions()}</ul>
            </li>
          }
        </ListGroup>
        <Button onClick={() => this.props.history.goBack()}>Go Back</Button>
      </div>
    );
  }
}
