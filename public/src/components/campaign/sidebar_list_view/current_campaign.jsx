import React from 'react';
import { Button } from 'react-bootstrap';

const CurrentCampaign = (props) => {
  const { currentCampaign,
          defaultMsg,
          history,
          userId,
          initiateTwilioCall } = props;
  const { id: campaignId } = currentCampaign;
  if (!currentCampaign) {
    return (
      <div id={campaignId}>
        <p className="lead">{defaultMsg}</p>
      </div>
    );
  }
  const handleClick = () => {
    initiateTwilioCall(userId, campaignId);
    history.push(`/volunteers/campaigns/${campaignId}/calls`);
  };
  const { description, status, title } = currentCampaign;
  return (
    <div id={campaignId}>
      <h3>{title}</h3>
      <hr />
      <p className="lead">{description}</p>
      <Button onClick={handleClick} bsStyle="primary" className={status !== 'active' ? 'disabled' : ''}>
        <i className="material-icons small">phone_in_talk</i> Start Calling
      </Button>
    </div>
  );
};
export default CurrentCampaign;
