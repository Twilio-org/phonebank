import React from 'react';
import { Button } from 'react-bootstrap';

const CurrentCampaign = (props) => {
  const { campaign, id, defaultMsg } = props;
  if (!campaign.title) {
    return (
      <div id={id}>
        <p className="lead">{defaultMsg}</p>
      </div>
    );
  }
  return (
    <div id={id}>
      <h3>{campaign.title}</h3>
      <hr />
      <p className="lead">{campaign.description}</p>
      <Button bsStyle="primary" className={campaign.status !== 'active' ? 'disabled' : ''}>
        <i className="material-icons small">phone_in_talk</i> Start Calling
      </Button>
    </div>
  );
};
export default CurrentCampaign;
