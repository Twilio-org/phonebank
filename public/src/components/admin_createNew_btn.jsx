import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class CreateNewButton extends Component {
  constructor(props) {
    super(props);
    this.handleRedirectClick = this.handleRedirectClick.bind(this);
  }
  handleRedirectClick() {
    const { history, path } = this.props;
    history.push(path);
  }

  render() {
    const { page } = this.props;
    return (
      <div>
        <Button
          type="button"
          bsSize="xsmall"
          onClick={this.handleRedirectClick}
        >
          Create New {page}
        </Button>
      </div>
    );
  }
}
