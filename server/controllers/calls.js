import callsService from '../db/services/calls';
import contactsService from '../db/services/contacts';
import usersService from '../db/services/users';
import responsesService from '../db/services/responses';

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

function updateNoCallContact(outcome, id) {
  const { updateContactDoNotCallById, updateContactInvalidNumberById } = contactsService;
  const outcomeMap = {
    DO_NOT_CALL: updateContactDoNotCallById,
    BAD_NUMBER: updateContactInvalidNumberById
  };
  return outcomeMap[outcome]({ id });
}

function checkCallIsAssigned(status) {
  return status === 'ASSIGNED';
}

function lookUpCall(id) {
  return callsService.getCallById({ id });
}

function putCallAttempt(id, outcome, notes) {
  return callsService.recordAttempt({ id, outcome, notes });
}

function saveNewAttempt(contact_id, campaign_id, attempt_num) {
  const newCallParams = { contact_id, campaign_id, attempt_num };

  return callsService.createNewAttempt(newCallParams);
}

function afterPutCallAttempt(res, outcome, contact_id, attempt_num, campaign_id) {
  if (outcome === 'DO_NOT_CALL' || outcome === 'BAD_NUMBER') {
    return updateNoCallContact(outcome, contact_id)
      .then(() => res.status(200).json({ message: 'contact and call log updated successfully.' }))
      .catch(err => console.log('could not update contact do-not-call status: ', err));
  } else if (outcome === 'LEFT_MSG' || outcome === 'NO_ANSWER' || outcome === 'INCOMPLETE') {
    if (attempt_num < 3) {
      return saveNewAttempt(contact_id, campaign_id, attempt_num + 1)
        .then(() => res.status(200).json({ message: 'call log successfully updated & call requeued.' }))
        .catch(err => console.log('could not create new blank call attempt: ', err));
    }
  }
  return res.status(200).json({ message: 'call log successfully updated' });
}

export function assignCall(req, res) {
  const user_id = parseInt(req.params.id, 10);
  const user_campaign_id = parseInt(req.params.campaign_id, 10);

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

export function recordAttempt(req, res) {
  const { outcome, notes, responses } = req.body;
  let parsedResponses;
  try {
    parsedResponses = JSON.parse(JSON.stringify(responses));
  } catch (err) {
    return res.status(400).json({ message: 'Invalid JSON object' });
  }
  const call_id = parseInt(req.params.call_id, 10);
  const user_id = parseInt(req.params.id, 10);
  const user_campaign_id = parseInt(req.params.campaign_id, 10);

  if (!outcomeIsValid(outcome)) {
    return res.status(400).json({ message: 'Outcome is not valid' });
  }

  return userHasJoinedCampaign(user_id, user_campaign_id)
    .then((userHasJoined) => {
      if (userHasJoined) {
        return lookUpCall(call_id).then((call) => {
          if (call) {
            const { contact_id, campaign_id, status } = call.attributes;
            if (checkCallIsAssigned(status)) {
              return putCallAttempt(call_id, outcome, notes)
                .then(() => {
                  Promise.all(parsedResponses.map((resp) => {
                    const { question_id, response } = resp;
                    const responseParams = { call_id, question_id, response };
                    return responsesService.saveNewResponse(responseParams);
                  }))
                    .then(() => {
                      console.log('Response saved successfully');
                      const attempt_num = parseInt(call.attributes.attempt_num, 10);
                      afterPutCallAttempt(res, outcome, contact_id, attempt_num, campaign_id);
                    }).catch(() => res.status(500).json({ message: 'Unable to save at least one of the given responses' }));
                }).catch(err => console.log('could not set call status to attempted: ', err));
            }
            return res.status(400).json({ message: 'call does not have status \'ASSIGNED\'' });
          }
          return res.status(404).json({ message: 'Call ID does not exist' });
        }).catch(err => console.log('could not find call for updating: ', err));
      }
      return res.status(401).json({ message: 'User has not joined that campaign' });
    })
    .catch(err => console.log('could not check if user has joined campaign: ', err));
}

export function releaseCall(req, res) {
  const call_id = parseInt(req.params.call_id, 10);
  const user_id = parseInt(req.params.id, 10);
  const user_campaign_id = parseInt(req.params.campaign_id, 10);

  return userHasJoinedCampaign(user_id, user_campaign_id)
    .then((userHasJoined) => {
      if (userHasJoined) {
        return lookUpCall(call_id).then((call) => {
          const { status } = call.attributes;

          if (checkCallIsAssigned(status)) {
            return callsService.releaseCall({ id: call_id })
              .then(() => res.status(200).json({ message: 'call successfully released' }))
              .catch(err => console.log('could not release call: ', err));
          }
          return res.status(400).json({ message: 'call does not have status \'ASSIGNED\'' });
        }).catch(err => console.log('could not find call for updating: ', err));
      }
      return res.status(401).json({ message: 'User has not joined that campaign' });
    })
    .catch(err => console.log('could not check if user has joined campaign: ', err));
}
