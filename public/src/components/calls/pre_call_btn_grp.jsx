import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

export default class PreCallButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.handleStartCallingClick = this.handleStartCallingClick.bind(this);
  }

  handleStartCallingClick() {
    const { updateCallStatus } = this.props;
    updateCallStatus('IN_PROGRESS');
  }

  render() {
    const { contact_name } = this.props;
    return (
      <div>
        <h5>Now Calling:</h5>
        <h3>{contact_name}</h3>

        <Button onClick={this.handleStartCallingClick} bsStyle="success">Start Call</Button>

        <div>
          <ButtonGroup vertical>
            <Button bsStyle="warning">Skip this person</Button>
            <Button bsStyle="danger">Bad Name</Button>
            <Button bsStyle="info">Stop Calling</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
