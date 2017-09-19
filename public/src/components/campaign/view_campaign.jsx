import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class ViewCampaign extends Component {

  componentDidMount() {
    if (this.props.admin_campaigns === undefined) {
      const { id } = this.props.match.params;
      this.props.fetchCampaign(id);
    }
  }

  render() {
    const { current_campaign, history } = this.props;
    const { name, title, status, description } = current_campaign;
    return (
      <div>
        <h1>{current_campaign ? name : null } Campaign Details</h1>
        <h4>Title:</h4>
        {current_campaign ? (<p>{title}</p>) : null}
        <h4>Status:</h4>
        {current_campaign ? (<p>{status}</p>) : null}
        <h4>Description:</h4>
        {current_campaign ? (<p>{description}</p>) : null}
        <Button
          bsStyle="primary"
          onClick={history.goBack}
        >
          Cancel
        </Button>
      </div>
    );
  }
}
