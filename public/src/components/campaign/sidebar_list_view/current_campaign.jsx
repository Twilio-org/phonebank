import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const CurrentCampaign = (props) => {
  const { currentCampaign,
          defaultMsg,
          history,
          userId,
          initiateTwilioCall } = props;
  const currentCampaignIsEmpty = _.isEmpty(currentCampaign);
  if (currentCampaignIsEmpty) {
    return (
      <div id="join-campaign-message">
        <Link className="lead" to={'/volunteers/campaigns/all'}>{defaultMsg}</Link>
      </div>
    );
  }
  const handleClick = () => {
    const { id: campaignId } = currentCampaign;
    initiateTwilioCall(userId, campaignId);
    history.push(`/volunteers/campaigns/${campaignId}/calls`);
  };
  const { description, status, title, id: campaignId } = currentCampaign;
  return (
    <div id={campaignId}>
      <h3>{title}</h3>
      <hr />
      <p className="lead">{description}</p>
      <Button onClick={handleClick} bsStyle="primary" disabled={status !== 'active'}>
        <i className="material-icons small">phone_in_talk</i> Start Calling
      </Button>
    </div>
  );
};
export default CurrentCampaign;
