import React from 'react';
import { Button } from 'react-bootstrap';

const CurrentCampaign = (props) => {
  const { campaign,
          currentCampaign,
          defaultMsg,
          history,
          userId,
          call_volunteer_active,
          initiateTwilioCall } = props;
  const { id: campaignId } = currentCampaign;
  if (!campaign) {
    return (
      <div id={campaignId}>
        <p className="lead">{defaultMsg}</p>
      </div>
    );
  }
  const handleClick = () => {
    initiateTwilioCall(userId, campaignId, call_volunteer_active);
    history.push(`/volunteers/campaigns/${campaignId}/calls`);
  };
  return (
    <div id={campaignId}>
      <h3>{campaign.title}</h3>
      <hr />
      <p className="lead">{campaign.description}</p>
      <Button onClick={handleClick} bsStyle="primary" className={campaign.status !== 'active' ? 'disabled' : ''}>
        <i className="material-icons small">phone_in_talk</i> Start Calling
      </Button>
    </div>
  );
};
export default CurrentCampaign;
