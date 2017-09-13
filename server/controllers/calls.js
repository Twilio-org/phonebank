import callsService from '../db/services/calls';
import contactsService from '../db/services/contacts';
import usersService from '../db/services/users';
import responsesService from '../db/services/responses';
import { hangUp, mutateCallConnectContact } from '../util/twilio';

function userHasJoinedCampaign(userId, campaignId) {
  return usersService.getUserCampaigns({ id: userId })
    .then((campaigns) => {
      const userCampaigns = campaigns.models.filter(campaign => campaign.id === campaignId);

      return !!userCampaigns.length;
    });
}

function updateNoCallContact(outcome, id) {
  const { updateContactDoNotCallById, updateContactInvalidNumberById } = contactsService;
  const outcomeMap = {
    DO_NOT_CALL: updateContactDoNotCallById,
    BAD_NUMBER: updateContactInvalidNumberById
  };
  return outcomeMap[outcome]({ id });
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

/* ======== Call update HELPERS ========== */
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

function validateStatusForUpdate(currStatus, prevStatus) {
  const validTransitions = {
    ASSIGNED: 'IN_PROGRESS',
    IN_PROGRESS: 'HUNG_UP',
    HUNG_UP: 'ATTEMPTED'
  };
  if (!validTransitions[currStatus]) {
    return false;
  }
  if (currStatus === 'IN_PROGRESS' || currStatus === 'HUNG_UP') {
    if (validTransitions[prevStatus] !== currStatus) {
      return false;
    }
  }
  return true;
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
/* ======== END HELPERS ========== */

export function recordAttempt(req, res) {
  const { outcome, notes, responses, status: newStatus } = req.body;
  let parsedResponses;
  // responses will not exist in a status update for HUNG_UP and IN_PROGRESS
  if (newStatus === 'ATTEMPTED') {
    if (!responses || !outcome) {
      res.status(400).json({ message: 'update request with a status of ATTEMPTED must have response object and outcome string' });
    }
    try {
      parsedResponses = JSON.parse(responses);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid JSON object' });
    }
  }
  const call_id = parseInt(req.params.call_id, 10);
  const user_id = parseInt(req.params.id, 10);
  const user_campaign_id = parseInt(req.params.campaign_id, 10);

  // not necessary if just updating the status
  if (outcome && !outcomeIsValid(outcome)) {
    return res.status(400).json({ message: 'Outcome is not valid' });
  }

  return userHasJoinedCampaign(user_id, user_campaign_id)
    .then((userHasJoined) => {
      if (userHasJoined) {
        return lookUpCall(call_id).then((call) => {
          if (call) {
            const { contact_id, campaign_id, status } = call.attributes;
            if (validateStatusForUpdate(newStatus, status)) {
              if (newStatus === 'HUNG_UP') {
                return callsService.updateCallStatus({ id: call_id, status: newStatus })
                  .then(updatedCall => res.status(200).json({ message: `call status updated to ${newStatus}`, call: updatedCall }))
                  .catch(err => console.log('error updating status in calls controller: ', err));
              } else if (newStatus === 'IN_PROGRESS') {
                return usersService.getUserById({ id: user_id })
                  .then((user) => {
                    if (user) {
                      const { call_sid } = user.attributes;
                      const idCollection = {
                        user: user_id,
                        campaign: campaign_id,
                        call: call_id
                      };
                      return mutateCallConnectContact(call_sid, idCollection)
                        .then(() =>
                          callsService.updateCallStatus({ id: call_id, status: newStatus })
                            .then(updatedCall => res.status(200).json({ message: `call status updated to ${newStatus}`, call: updatedCall }))
                            .catch(err => console.log('error updating status in calls controller: ', err))
                        ).catch(err => console.log('error mutating call in recordAttempt function of calls controller when setting modifying call with Twilio client: ', err));
                    }
                    return res.status(400).json({ message: `could not find user with id ${user_id}` });
                  }).catch(err => console.log('error finding user by id in recordAttempt function of calls controller when getting user call SID for IN_PROGRESS status: ', err));
              }
              return putCallAttempt(call_id, outcome, notes)
                .then(() => {
                  Promise.all(parsedResponses.map((resp) => {
                    const { question_id, response } = resp;
                    const responseParams = { call_id, question_id, response };
                    return responsesService.saveNewResponse(responseParams);
                  }))
                    .then(() => {
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
    }).catch(err => console.log('could not check if user has joined campaign: ', err));
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


export function hangUpCall(req, res) {
  const { id } = req.params;
  return usersService.getUserById({ id })
    .then((user) => {
      if (user) {
        const { call_sid } = user.attributes;
        return hangUp(call_sid, id)
          .then((call) => {
            console.log('Current call session status successfully updated', call);
            return usersService.clearUserCallSID({ id })
              .then(() => res.status(202).json({ message: 'call succesfully hung up' }))
              .catch(() => res.status(400).json({ message: 'call could not be terminated' }));
          })
          .catch((error) => {
            console.log('Could not terminate call from Twilio client', error);
            return res.status(500).json({ message: 'unable to terminate call from Twilio client' });
          });
      }
      return res.status(404).json({ message: 'User ID could not be found' });
    })
    .catch((error) => {
      console.log('could not get user by id', error);
      res.status(500).json({ message: 'could not get user\'s by ID ' });
    });
}
