import React from 'react';
import { Button } from 'react-bootstrap';

const CurrentCampaign = (props) => {
  const { campaign } = props;
  return (
    <div>
      <h2>{campaign.title}</h2>
      <p>{campaign.description}</p>
      <Button bsStyle="primary">
        <i className="material-icons small">phone</i> Start Calling
      </Button>
    </div>
  );
};
export default CurrentCampaign;
