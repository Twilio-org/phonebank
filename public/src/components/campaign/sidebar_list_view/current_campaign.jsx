import React from 'react';
import { Button } from 'react-bootstrap';

const CurrentCampaign = (props) => {
  const { campaign, id } = props;
  const selectCampaignMsg = () => (
    <div id={id}>
      <p className="lead">Select a campaign</p>
    </div>
  );
  if (!campaign.title) {
    return selectCampaignMsg();
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
