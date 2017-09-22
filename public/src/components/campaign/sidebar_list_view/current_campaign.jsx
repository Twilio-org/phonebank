import React from 'react';
import { Button, OverlayTrigger, Tooltip, Popover } from 'react-bootstrap';
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
  // const tooltip = (
  //   <Tooltip id="tooltip">Once you click the <strong>Start Calling</strong> button, the phonebank will initialize a call to the phone number you registered with.</Tooltip>
  // );

  const popover = (
    <Popover id="popover-trigger-hover">
      Once you click the <strong>Start Calling</strong> button, the phonebank will initialize a call to the phone number you registered with.
    </Popover>
  );


  return (
    <div id={campaignId}>
      <h3>{title}</h3>
      <hr />
      <p className="lead">{description}</p>
      <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
        <Button onClick={handleClick} bsStyle="primary" disabled={status !== 'active'}>
          <i className="material-icons small">phone_in_talk</i> Start Calling
        </Button>
      </OverlayTrigger>
    </div>
  );
};
export default CurrentCampaign;
