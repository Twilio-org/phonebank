import callsService from '../db/services/calls';
import contactsService from '../db/services/contacts';
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
  const { id, campaign_id } = req.params;
  const user_id = parseInt(id, 10);
  const user_campaign_id = parseInt(campaign_id, 10);

  userHasJoinedCampaign(user_id, user_campaign_id)
    .then((userHasJoined) => {
      if (userHasJoined) {
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
    }).catch(err => console.log(err));
}


function updateNoCallContact(outcome, id) {
  const { updateContactDoNotCallById, updateContactInvalidNumberById } = contactsService;
  const outcomeMap = {
    DO_NOT_CALL: updateContactDoNotCallById,
    BAD_NUMBER: updateContactInvalidNumberById
  };
  return outcomeMap[outcome]({ id });
}

export function recordAttempt(req, res) {
  const { outcome, notes } = req.body;
  const {
    call_id: string_call_id,
    id: string_user_id,
    campaign_id: string_campaign_id
  } = req.params;
  const call_id = parseInt(string_call_id, 10);
  const user_id = parseInt(string_user_id, 10);
  const user_campaign_id = parseInt(string_campaign_id, 10);

  if (!outcomeIsValid(outcome)) {
    return res.status(400).json({ message: 'Outcome is not valid' });
  }

  userHasJoinedCampaign(user_id, user_campaign_id)
    .then((userHasJoined) => {
      if (userHasJoined) {
        callsService.getCallById({ id: call_id }).then((call) => {
          const { contact_id, campaign_id } = call.attributes;
          console.log('~~~~~~~~~~~contact_id: ', contact_id);

          return callsService.recordAttempt({ id: call_id, outcome, notes })
            .then(() => {
              const { attempt_num: string_attempt_num } = call.attributes;
              const attempt_num = parseInt(string_attempt_num, 10);

              if (outcome === 'DO_NOT_CALL' || outcome === 'BAD_NUMBER') {
                return updateNoCallContact(outcome, contact_id)
                  .then((contact) => {
                    if (contact) {
                      res.status(200).json({ message: 'contact and call log updated successfully.' });
                    }
                  })
                  .catch(err => console.log(err));
              } else if (outcome === 'LEFT_MSG' || outcome === 'NO_ANSWER' || outcome === 'INCOMPLETE') {
                if (attempt_num < 3) {
                  const new_attempt_num = attempt_num + 1;
                  const newCallParams = {
                    contact_id,
                    campaign_id,
                    attempt_num: new_attempt_num
                  };
                  console.log('~~~~~~~~~~~newCallParams: ', newCallParams);
                  return callsService.createNewAttempt(newCallParams)
                    .then((newCallRecord) => {
                      console.log('~*~*~*~*~*! New Call Record', newCallRecord);
                      if (newCallRecord) {
                        console.log('@@@@@@@@@');
                        return res.status(200).json({ message: 'call log successfully updated & call requeued.' });
                      }
                      return console.log('114');
                    })
                    .catch(err => console.log(err));
                }
              } else if (outcome === 'ANSWERED' || attempt_num === 3) {
                return res.status(200).json({ message: 'call log successfully updated' });
              }
              return res.status(200).json({ message: 'call log successfully updated' });
            }
          ).catch(err => console.log(err));
        }).catch(err => console.log(err));
      } else {
        return res.status(401).json({ message: 'User has not joined that campaign' });
      }
      return null;
    })
    .catch(err => console.log(err));
  return null;
}
