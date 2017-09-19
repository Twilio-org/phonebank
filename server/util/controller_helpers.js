import _ from 'lodash';

/* == CAMPAIGN CONTROLLER HELPERS == */
export function validCampaignStatusUpdate(prevStatus, currStatus) {
  const validCampaignStatusTransitions = {
    draft: ['active'],
    active: ['pause', 'completed'],
    pause: ['active', 'completed'],
    completed: 1
  };
  const validStatusOptions = Object.keys(validCampaignStatusTransitions);
  const validTransitionForStatus = validCampaignStatusTransitions[prevStatus].join(', ');
  if (prevStatus === 'completed') {
    throw new Error('Campaigns with status set to "completed" may not be changed.');
  }
  if (!validCampaignStatusTransitions[currStatus]) {
    throw new Error(`Status update to: ${currStatus} is invalid, valid status options: ${validStatusOptions.join(', ')}.`);
  }
  if (!validCampaignStatusTransitions[prevStatus].includes(currStatus)) {
    throw new Error(`Invalid campaign status transition. Status ${prevStatus} can only transition to ${validTransitionForStatus} `);
  }
  return true;
}

export function allowDraftCampaignUpdates(currentStatus, requestBody) {
  if (currentStatus === 'draft') {
    const { name, title, description, contact_lists_id, script_id } = requestBody;
    return { name, title, description, contact_lists_id, script_id };
  }
  throw new Error('Cannot edit campaign that is not in draft.');
}

export function listUpdatedParamsMessage(paramsObj) {
  const result = {
    keys: [],
    values: []
  };
  _.forEach(paramsObj, (value, key) => {
    if (value) {
      result.keys.push(key);
      result.values.push(value);
    }
  });
  result.keys.join(', ');
  result.values.join(', ');
  return result;
}
