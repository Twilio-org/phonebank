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
    console.log('PROPS', this.props);
    const { current_campaign, current_script, history } = this.props;
    const { name, title, status, description, script_id } = current_campaign;
    const { name: scriptName } = current_script;
    return (
      <div>
        <h1>{current_campaign ? name : null } Campaign Details</h1>
        <h4>Title:</h4>
        {current_campaign ? (<p>{title}</p>) : null}
        <h4>Status:</h4>
        {current_campaign ? (<p>{status}</p>) : null}
        <h4>Description:</h4>
        {current_campaign ? (<p>{description}</p>) : null}
        <h4>Script Name:</h4>
        {current_script ? (<p>{scriptName}</p>) : null}
        <Button
          bsStyle="primary"
          onClick={() => { history.push({ pathname: `/admin/scripts/${script_id}` }); }}
        >
          View Script
        </Button>
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
