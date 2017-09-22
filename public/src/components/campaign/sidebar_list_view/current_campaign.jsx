import React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const CurrentCampaign = (props) => {
  const { currentCampaign,
          defaultMsg,
          history,
          userId,
          list,
          initiateTwilioCall } = props;
  const currentCampaignIsEmpty = _.isEmpty(currentCampaign);
  if (currentCampaignIsEmpty) {
    return (
      <div id="join-campaign-message">
        <p className="lead" to={'/volunteers/campaigns/all'}>{defaultMsg}</p>
      </div>
    );
  }
  const handleClick = () => {
    const { id: campaignId } = currentCampaign;
    initiateTwilioCall(userId, campaignId);
    history.push(`/volunteers/campaigns/${campaignId}/calls`);
  };
  const { description, title, id: campaignId } = currentCampaign;

  const popover = (
    <Popover id="popover-trigger-hover-focus">
      Once you click the <strong>Start Calling</strong> button, the phonebank
       will initialize a call to the phone number you registered with.
    </Popover>
  );

  const getStatus = () => {
    const { id } = currentCampaign;
    const active = list.filter(campaign => campaign.id === parseInt(id, 10))[0];
    if (active !== undefined) {
      return active.status;
    }
    return null;
  };


  return (
    <div id={campaignId}>
      <h3>{title}</h3>
      <hr />
      <p className="lead">{description}</p>
      <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popover}>
        <Button onClick={handleClick} bsStyle="primary" disabled={getStatus() !== 'active'}>
          <i className="material-icons small">phone_in_talk</i> Start Calling
        </Button>
      </OverlayTrigger>
    </div>
  );
};
export default CurrentCampaign;
