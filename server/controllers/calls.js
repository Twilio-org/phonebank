import callsService from '../db/services/calls';
import contactsService from '../db/services/contacts';
import usersService from '../db/services/users';
import responsesService from '../db/services/responses';
import campaignsService from '../db/services/campaigns';

import { hangUpVolunteerCall, hangUpContactCall, mutateCallConnectContact } from '../util/twilio';

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

function validateStatusForUpdate(newStatus, prevStatus) {
  const validTransitions = {
    ASSIGNED: ['IN_PROGRESS', 'ATTEMPTED'],
    IN_PROGRESS: ['HUNG_UP'],
    HUNG_UP: ['ATTEMPTED'],
    ATTEMPTED: 1
  };
  if (!validTransitions[newStatus]) {
    return false;
  }
  if (prevStatus !== 'ATTEMPTED') {
    if (!validTransitions[prevStatus].includes(newStatus)) {
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

function afterPut(res, outcome, contact_id, attempt_num, campaign_id) {
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

function handleHangUpFlow(res, user_id, call_id, campaign_id) {
  return usersService.getUserById({ id: user_id })
  .then((userObj) => {
    const { call_sid: userCallSid } = userObj.attributes;
    hangUpContactCall(userCallSid, user_id, campaign_id)
    .then(() => {
      callsService.updateCallStatus({ id: call_id, status: 'HUNG_UP' })
      .then((updateResponse) => {
        const { attributes: updatedCall } = updateResponse;
        if (updatedCall) {
          const updateCallSuccess = 'call status updated to HUNG_UP';
          return res.status(200)
            .json({ message: updateCallSuccess });
        }
        return res.status(500).json({ messge: 'problem with updating call status to HUNG_UP' });
      })
      .catch((err) => {
        const updateCallError = `Could not update call status to 'HUNG_UP': ${err}`;
        return res.status(500).json({ message: updateCallError });
      });
    })
    .catch((err) => {
      const hangUpCallError = `Could not hang up call from twilio client to contact: ${err}`;
      return res.status(500).json({ message: hangUpCallError });
    });
  })
  .catch(err => res.status(404).json({ message: `Could not find user by ID, could not hang up user: ${err}` }));
}

function getCallsNotAttempted(campaign_id) {
  return callsService.getCallsNotAttemptedByCampaignId({ campaign_id });
}

function isFinalOutcome(outcome) {
  const finalOutcomes = ['ANSWERED', 'BAD_NUMBER', 'DO_NOT_CALL'];
  return finalOutcomes.includes(outcome.toUpperCase());
}

function markCampaignCompleteIfLastCall(res, campaign_id, outcome) {
  return getCallsNotAttempted(campaign_id)
    .then((callsNotAttempted) => {
      const callOutComeIsFinal = isFinalOutcome(outcome);
      const numCallsNotAttempted = callsNotAttempted.length;
      if (callOutComeIsFinal && numCallsNotAttempted === 0) {
        return campaignsService.markCampaignAsCompleted({ id: campaign_id })
          .then(() => res.status(201).json({ message: 'Campaign successfully marked as completed.' }))
          .catch((err) => {
            console.log('Cannot update the campaign as completed: ', err);
            return res.status(500).json({ message: `Cannot update the campaign as completed: ${err}` });
          });
      }
      return res.status(304).json({ message: 'Campaign status not modified. Not yet end of campaign calls.' });
    })
    .catch(err => res.status(500).json({ message: `Cannot get calls not attempted by campaign_id: ${err}` }));
}

/* ======== END HELPERS ========== */

export function recordAttempt(req, res) {
  const { outcome, notes, responses, status: newStatus } = req.body;

  if (newStatus === 'ATTEMPTED' && outcome === 'ANSWERED') {
    if (!responses || !outcome) {
      return res.status(400).json({ message: 'update request with a status of ATTEMPTED and outcome of ANSWERED must have response object.' });
    }
    if (!Array.isArray(responses)) {
      return res.status(400).json({ message: 'Responses should be an array of objects' });
    }
  }
  const call_id = parseInt(req.params.call_id, 10);
  const user_id = parseInt(req.params.id, 10);
  const user_campaign_id = parseInt(req.params.campaign_id, 10);

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
                return handleHangUpFlow(res, user_id, call_id, campaign_id);
              } else if (newStatus === 'IN_PROGRESS') {
                return usersService.getUserById({ id: user_id })
                  .then((user) => {
                    if (user) {
                      const { call_sid } = user.attributes;
                      if (!call_sid) {
                        return res.status(400).json({ message: 'user is not currently connected to a call session' });
                      }
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
                    return res.status(404).json({ message: `could not find user with id ${user_id}` });
                  }).catch(err => console.log('error finding user by id in recordAttempt function of calls controller when getting user call SID for IN_PROGRESS status: ', err));
              }
              return putCallAttempt(call_id, outcome, notes)
                .then(() => {
                  const attempt_num = parseInt(call.attributes.attempt_num, 10);
                  if (responses) {
                    Promise.all(responses.map((resp) => {
                      const { question_id, response } = resp;
                      const responseParams = { call_id, question_id, response };
                      return responsesService.saveNewResponse(responseParams);
                    }))
                    .then(() => markCampaignCompleteIfLastCall(res, campaign_id, outcome))
                    .catch(err => console.log('error saving responses in recordAttempt function of calls controller when saving a call attempt :', err));
                  }
                  return afterPut(res, outcome, contact_id, attempt_num, campaign_id)
                    .then(() => markCampaignCompleteIfLastCall(res, campaign_id, outcome))
                    .catch(err => console.log('error creating new call in log for required subsequent contact after recording attempt in recordAttempt function of calls controller and/or marking campaign as final if last call marked as attempted', err));
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
        return hangUpVolunteerCall(call_sid, id)
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
