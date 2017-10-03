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
      <Button
        type="button"
        bsSize="small"
        bsStyle="primary"
        onClick={this.handleRedirectClick}
        className="create-btn"
      >
        Create {page}
      </Button>
    );
  }
}
