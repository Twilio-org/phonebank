import callsService from '../db/services/calls';
import usersService from '../db/services/users';

function userHasJoinedCampaign(userId, campaignId) {
  return usersService.getUserCampaigns({ id: userId })
    .then((campaigns) => {
      const userCampaigns = campaigns.models.filter(campaign => campaign.id === campaignId);

      return !!userCampaigns.length;
    });
}

function outcomeIsValid(outcome) {
  const validOutcomes = [
    'ANSWERED',
    'BAD_NUMBER',
    'DO_NOT_CALL',
    'LEFT_MSG',
    'NO_ANSWER',
    'INCOMPLETE'
  ];

  return validOutcomes.includes(outcome.toUpperCase());
}

export function assignCall(req, res) {
  const { id: user_id, campaign_id: user_campaign_id } = req.params;

  if (userHasJoinedCampaign(user_id, user_campaign_id)) {
    return callsService.assignCall({
      campaign_id: user_campaign_id,
      user_id
    }).then((call) => {
      if (call) {
        return res.status(200).json(call);
      }

      return res.status(404).json({ message: 'no calls available' });
    }).catch(err => console.log('Could not assign call:', err));
  }

  return res.status(401).json({ message: 'User has not joined that campaign' });
}

function updateNoCallContact(outcome, id) {
  const { updateContactDoNotCallById, updateContactInvalidNumberById } = usersService;
  const outcomeMap = {
    DO_NOT_CALL: updateContactDoNotCallById,
    BAD_NUMBER: updateContactInvalidNumberById
  };
  return outcomeMap[outcome]({ id });
}

export function recordAttempt(req, res) {
  const { outcome, notes } = req.body;
  const { call_id: id } = req.params;
  const user_id = req.params.id;
  const user_campaign_id = req.params.campaign;

  if (!outcomeIsValid) {
    return res.status(401).json({ message: 'Outcome is not valid' });
  }

  if (userHasJoinedCampaign(user_id, user_campaign_id)) {
    callsService.getCallById({ id }).then((call) => {
      const { contact_id } = call;

      return callsService.recordAttempt({ id, outcome, notes })
      .then((attemptedCall) => {
        let { attempt_num } = attemptedCall;
        attempt_num = parseInt(attempt_num, 10);

        if (outcome === 'DO_NOT_CALL' || outcome === 'BAD_NUMBER') {
          return updateNoCallContact(outcome, contact_id)
            .then(() => {
              res.status(200).json({ message: 'contact and call log updated successfully' });
            })
            .catch(err => console.log(err));
        }

        if (outcome === 'LEFT_MSG' || outcome === 'NO_ANSWER' || outcome === 'INCOMPLETE') {
          if (attempt_num < 3) {
            attempt_num = (attempt_num + 1).toString();
            const updatedCall = {
              ...attemptedCall,
              attempt_num
            };
            callsService.createNewAttempt(updatedCall)
              .then()
              .catch(err => console.log(err));
          }
          return res.status(200).json({ message: 'call log updated successfully' });
        }
        // ANSWERED:
        return res.status(200).json({ message: 'call log updated successfully' });
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }
  return res.status(401).json({ message: 'User has not joined that campaign' });
}
