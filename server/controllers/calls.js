import callsService from '../db/services/calls';
import contactsService from '../db/services/contacts';
import usersService from '../db/services/users';
import responsesService from '../db/services/responses';
import campaignsService from '../db/services/campaigns';

import { hangUpVolunteerCall, hangUpContactCall, mutateCallConnectContact } from '../util/twilio';

/* ======== Call update HELPERS ========== */

function updateNoCallContact(outcome, id) {
  const { updateContactDoNotCallById, updateContactInvalidNumberById } = contactsService;
  const outcomeMap = {
    DO_NOT_CALL: updateContactDoNotCallById,
    BAD_NUMBER: updateContactInvalidNumberById
  };
  return outcomeMap[outcome]({ id });
}

function validateOutcome(newOutcome, prevOutcome) {
  const validOutcomes = [
    'ANSWERED',
    'BAD_NUMBER',
    'DO_NOT_CALL',
    'LEFT_MSG',
    'NO_ANSWER',
    'INCOMPLETE'
  ];
  if (prevOutcome !== 'PENDING') {
    return false;
  }
  return validOutcomes.includes(newOutcome);
}

function validateStatusTransition(newStatus, prevStatus) {
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

function putCallAttempt(id, outcome, notes) {
  return callsService.recordAttempt({ id, outcome, notes })
    .then((updatedCall) => {
      if (updatedCall) {
        return { callUpdateSuccess: true };
      }
      return { callUpdateSuccess: false, callUpdateCode: 500, callUpdateMessage: `Unexpectedly unable to update call with outcome ${outcome}` };
    }).catch(err => ({ callUpdateSuccess: false, callUpdateCode: 500, callUpdateMessage: `Unexpectedly unable to update call with outcome '${outcome}': ${err}` }));
}

function saveResponses(responses, call_id) {
  return Promise.all(responses.map((resp) => {
    const { question_id, response } = resp;
    const responseParams = { call_id, question_id, response };
    return responsesService.saveNewResponse(responseParams)
      .then()
      .catch(err => ({ responseSaveSucces: false, responseSaveCode: 500, responseSaveMessage: `Error saving responses: ${err}` }));
  })).then((savedResponses) => {
    const allSaved = savedResponses.every(savedResponse => !!savedResponse);
    if (allSaved) {
      return { responseSaveSucces: true, responseSaveCode: 200, responseSaveMessage: 'Successfully saved new responses' };
    }
    return { responseSaveSucces: false, responseSaveCode: 500, responseSaveMessage: 'Unexpectedly failed to save responses' };
  }).catch(err => ({ responseSaveSucces: false, code: 500, responseSaveMessage: `Error saving responses: ${err}` }));
}

function afterPut(updateContactId, updateCampaignId, updateOutcome, updateAttemptNum) {
  if (updateOutcome === 'DO_NOT_CALL' || updateOutcome === 'BAD_NUMBER') {
    return updateNoCallContact(updateOutcome, updateContactId)
      .then((updatedContact) => {
        if (updatedContact) {
          return { afterPutSuccess: true, afterPutCode: 201, afterPutMessage: 'Contact successfully updated' };
        }
        return { afterPutSuccess: false, afterPutCode: 500, afterPutMessage: 'Unexpectedly unable to update contact' };
      }).catch(err => ({ afterPutSuccess: false, afterPutCode: 500, afterPutMessage: `Error updating contact contact with outcome '${updateOutcome}': ${err}` }));
  } else if (updateOutcome === 'LEFT_MSG' || updateOutcome === 'NO_ANSWER' || updateOutcome === 'INCOMPLETE') {
    if (updateAttemptNum < 3) {
      return callsService.createNewAttempt({
        contact_id: updateContactId,
        campaign_id: updateCampaignId,
        attempt_num: (updateAttemptNum + 1).toString(10)
      }).then((newAttempt) => {
        if (newAttempt) {
          return { afterPutSuccess: true, afterPutCode: 201, afterPutMessage: 'Call log successfully updated.' };
        }
        return { afterPutSuccess: false, afterPutCode: 500, afterPutMessage: `Unexpectedly unable create new call attempt for contact with id ${updateContactId} for campaign ${updateCampaignId}.` };
      }).catch(err => ({ afterPutCode: 500, afterPutMessage: `Error creating new call attempt for contact with id ${updateContactId} for campaign ${updateCampaignId}: ${err}` }));
    }
  }
  return { afterPutSuccess: false, afterPutCode: 500, afterPutMessage: `Unexpectedly unable to handle post update outcome for contact with id ${updateContactId} for campaign ${updateCampaignId}` };
}

function handleHangUpFlow(userId, callId, campaignId, userCallSid) {
  return hangUpContactCall(userCallSid, userId, campaignId)
    .then(() =>
      callsService.updateCallStatus({ id: callId, status: 'HUNG_UP' })
        .then((updateResponse) => {
          if (updateResponse) {
            return { code: 200, message: 'call status updated to HUNG_UP' };
          }
          return { code: 500, messge: 'Unexpected problem with updating call status to HUNG_UP' };
        }).catch(err => ({ code: 500, message: `Could not update call status to 'HUNG_UP': ${err}` }))
    ).catch(err => ({ code: 500, message: `Could not hang up call from twilio client to contact: ${err}` }));
}

function isFinalOutcome(outcome) {
  const finalOutcomes = ['ANSWERED', 'BAD_NUMBER', 'DO_NOT_CALL'];
  return finalOutcomes.includes(outcome.toUpperCase());
}

function checkLastAttempted(campaign_id, outcome) {
  return callsService.getCallsNotAttemptedByCampaignId({ campaign_id })
    .then((callsNotAttempted) => {
      const callOutComeIsFinal = isFinalOutcome(outcome);
      const numCallsNotAttempted = callsNotAttempted.length;
      return (callOutComeIsFinal && numCallsNotAttempted === 0);
    }).catch(err => console.log(`Error in getting calls not attempted: ${err}`));
}

function markCampaignComplete(updateCampaignId) {
  return campaignsService.markCampaignAsCompleted({ id: updateCampaignId })
    .then((campaign) => {
      if (campaign) {
        return { updateCampaignCode: 201, updateCampaignMessage: 'Successfully marked campaign as completed.' };
      }
      return { updateCampaignCode: 500, updateCampaignMessage: `Unexpectedly unable to mark campaign with id ${updateCampaignId} as completed.` };
    })
    .catch(err => ({ updateCampaignCode: 500, updateCampaignMessage: `Error marking campaign with id ${updateCampaignId} as completed: ${err}.` }));
}

function validateUserAuthorizaion(user, updateCampaignId, updateCallId) {
  let authMessage;

  if (!user.hasCampaign(updateCampaignId)) {
    authMessage = `User has not joined campaign with id ${updateCampaignId}.`;
  } else if (!user.subjectCampaign.attributes.status === 'active') {
    authMessage = `Campaign with id ${updateCampaignId} is not active`;
  } else if (!user.hasCall(updateCallId)) {
    authMessage = `Call with id ${updateCallId} is not assigned to user.`;
  }
  if (authMessage) {
    return { authSuccess: false, authCode: 401, authMessage };
  }
  return { authSuccess: true };
}

function validateUpdate(
  currentCallOutcome,
  currentCallStatus,
  checkStatus,
  checkOutcome = null,
  checkResponses = null,
  checkNotes = null
) {
  if (typeof checkStatus !== 'string') {
    return { udpateValid: false, validationCode: 400, validationMessage: 'Status must be a string.' };
  }
  if (!validateStatusTransition(checkStatus, currentCallStatus)) {
    return { updateValid: false, validationCode: 400, validationMessage: 'Status transition not allowed.' };
  }
  if (checkOutcome) {
    if (typeof checkOutcome !== 'string') {
      return { updateValid: false, validationCode: 400, validationMessage: 'Outcome must be a string' };
    }
    if (!validateOutcome(checkOutcome, currentCallOutcome)) {
      return { updateValid: false, validationCode: 400, validationMessage: '' };
    }
    if (checkStatus !== 'ATTEMPTED') {
      return { updateValid: false, validationCode: 400, validationMessage: 'Update setting outcome must set status \'ATTEMPTED\'.' };
    }
    if (checkOutcome === 'ANSWERED') {
      if (!checkResponses) {
        return { updateValid: false, validationCode: 400, validationMessage: 'Update with outcome \'ANSWERED\' must include responses.' };
      }
      if (!Array.isArray(checkResponses)) {
        return { updateValid: false, validationCode: 400, validationMessage: 'Responses must be an array.' };
      }
    }
  }
  if (checkNotes && typeof checkNotes !== 'string') {
    return { updateValid: false, validationCode: 400, validationMessage: 'Notes must be a string.' };
  }
  return { updateValid: true };
}

function updateCallStatus(updateCallId, updateStatus) {
  return callsService.updateCallStatus({ id: updateCallId, status: updateStatus })
    .then(updatedCall => ({ code: 200, message: `Call status updated to ${updateStatus}`, call: updatedCall }))
    .catch(err => ({ code: 500, message: `Error updating call status to ${updateStatus}: ${err}` }));
}

function updateStatusNoOutcome(
  updateStatus,
  updateUserId,
  updateCallId,
  updateCampaignId,
  userCallSid
) {
  return new Promise((resolve, reject) => {
    if (!userCallSid) {
      return resolve({ statusUpdateCode: 400, statusUpdateMessage: 'User not currently connected to call session.' });
    }
    if (updateStatus === 'HUNG_UP') {
      return handleHangUpFlow(updateUserId, updateCallId, updateCampaignId, userCallSid)
      .then((hangUpResult) => {
        const { code, message } = hangUpResult;
        return resolve({ statusUpdateCode: code, statusUpdateMessage: message });
      });
    } else if (updateStatus === 'IN_PROGRESS') {
      return mutateCallConnectContact(
        userCallSid,
        { user: updateUserId, campaign: updateCampaignId, call: updateCallId }
      ).then(() =>
        updateCallStatus(updateCallId, updateStatus)
        .then((updatedCall) => {
          if (updatedCall) {
            return resolve({ statusUpdateCode: 201, statusUpdateMessage: 'Call status successfully updated.' });
          }
          return reject({ statusUpdateCode: 500, statusUpdateMessage: `Unexpectedly unable to update call with status ${updateStatus}` });
        }).catch(err => reject({ statusUpdateCode: 500, statusUpdateMessage: `Error updating call with status ${updateStatus}: ${err}` }))
      ).catch(err => reject({ statusUpdateCode: 500, statusUpdateMessage: `Error updating call with status ${updateStatus}: ${err}` }));
    }
    return reject({ statusUpdateCode: 500, statusUpdateMessage: `Unexpectedly unable to update call with status ${updateStatus}` });
  });
}

function saveResponseOrRequeue(
  updateResponses,
  updateCallId,
  updateContactId,
  updateCampaignId,
  updateOutcome,
  updateAttemptNum
) {
  if (updateResponses) {
    return saveResponses(updateResponses, updateCallId)
      .then((updateResponsesResult) => {
        const {
          responseSaveSuccess,
          responseSaveCode,
          responseSaveMessage
        } = updateResponsesResult;
        return {
          responseOrRequeueSuccess: responseSaveSuccess,
          responseOrRequeueCode: responseSaveCode,
          responseOrRequeueMessage: responseSaveMessage
        };
      })
      .catch(err => ({
        responseOrRequeueSuccess: false,
        responseOrRequeueCode: 500,
        responseOrRequeueMessage: `Unexpected Error saving responses for call with id ${updateCallId} in campaign with id ${updateCampaignId}: ${err}`
      }));
  }
  return afterPut(updateContactId, updateCampaignId, updateOutcome, updateAttemptNum)
    .then((putResult) => {
      const { afterPutSuccess, afterPutCode, afterPutMessage } = putResult;
      return {
        responseOrRequeueSuccess: afterPutSuccess,
        responseOrRequeueCode: afterPutCode,
        responseOrRequeueMessage: afterPutMessage
      };
    })
    .catch(err => ({
      responseOrRequeueSuccess: false,
      responseOrRequeueCode: 500,
      responseOrRequeueMessage: `Unexpected Error handling post update steps for call with id ${updateCallId} in campaign with id ${updateCampaignId}: ${err}`
    }));
}

/* ======== END HELPERS ========== */

export function assignCall(req, res) {
  const updateUserId = parseInt(req.params.id, 10);
  const updateCampaignId = parseInt(req.params.campaign_id, 10);
  let code;
  let message;

  return usersService.getUserWithCampaignsAndCallsById({ id: updateUserId })
    .then((user) => {
      if (!user.hasCampaign(updateCampaignId)) {
        code = 401;
        message = `User has not joined campaign with id ${updateCampaignId}.`;
      } else if (!user.subjectCampaign.attributes.status === 'active') {
        code = 401;
        message = `Campaign with id ${updateCampaignId} is not active`;
      }
      if (code && message) {
        return res.status(code).json({ message });
      }
      return callsService.assignCall({ campaign_id: updateCampaignId, user_id: updateUserId })
        .then((call) => {
          if (call) {
            return res.status(200).json(call);
          }
          code = 404;
          message = 'no calls available';
          return res.status(code).json({ message });
        }).catch(err => res.status(500).json({ message: `Error assigning call to user with id ${updateUserId} for campaign with id ${updateCampaignId}: ${err}` }));
    }).catch(err => res.status(500).json({ message: `Error looking up user with id ${updateUserId} to assign call for campaign with id ${updateCampaignId}: ${err}` }));
}

export function updateAttempt(req, res) {
  const {
    outcome: updateOutcome,
    notes: updateNotes,
    responses: updateResponses,
    status: updateStatus
  } = req.body;
  const updateCallId = parseInt(req.params.call_id, 10);
  const updateUserId = parseInt(req.params.id, 10);
  const updateCampaignId = parseInt(req.params.campaign_id, 10);
  let code;
  let message;

  return usersService.getUserWithCampaignsAndCallsById({ id: updateUserId })
    .then((user) => {
      const { authSuccess, authCode, authMessage } = validateUserAuthorizaion(
        user, updateCampaignId, updateCallId);
      if (!authSuccess) {
        code = authCode;
        message = authMessage;
      } else {
        const {
          attributes: { call_sid: userCallSid },
          subjectCall: { attributes: { outcome: callOutcome, status: callStatus } }
        } = user;
        const { updateValid, validationCode, validationMessage } = validateUpdate(
          callOutcome,
          callStatus,
          updateStatus,
          updateOutcome,
          updateResponses,
          updateNotes
        );
        if (updateValid) {
          return new Promise((resolve, reject) => {
            if (!updateOutcome) {
              return updateStatusNoOutcome(
                updateStatus,
                updateUserId,
                updateCallId,
                updateCampaignId,
                userCallSid
              ).then((updateStatusResult) => {
                const { statusUpdateCode, statusUpdateMessage } = updateStatusResult;
                return resolve({ code: statusUpdateCode, message: statusUpdateMessage });
              });
            }
            return putCallAttempt(updateCallId, updateOutcome, updateNotes)
              .then((putResult) => {
                const { callUpdateSuccess, callUpdateCode, callUpdateMessage } = putResult;
                if (!callUpdateSuccess) {
                  return reject({ code: callUpdateCode, message: callUpdateMessage });
                }
                const {
                  contact_id: updateContactId,
                  attempt_num
                } = user.subjectCall.attributes;
                const updateAttemptNum = parseInt(attempt_num, 10);
                return saveResponseOrRequeue(
                  updateResponses,
                  updateCallId,
                  updateContactId,
                  updateCampaignId,
                  updateOutcome,
                  updateAttemptNum
                )
                  .then((responseOrRequeueResult) => {
                    const {
                      responseOrRequeueSuccess,
                      responseOrRequeueCode,
                      responseOrRequeueMessage
                    } = responseOrRequeueResult;
                    if (!responseOrRequeueSuccess) {
                      return reject(
                        { code: responseOrRequeueCode, message: responseOrRequeueMessage }
                      );
                    }
                    return checkLastAttempted(updateCampaignId, updateOutcome)
                      .then((isLast) => {
                        if (isLast) {
                          return markCampaignComplete(updateCampaignId)
                            .then((markResult) => {
                              const { updateCampaignCode, updateCampaignMessage } = markResult;
                              return resolve({
                                code: updateCampaignCode,
                                message: updateCampaignMessage
                              });
                            }).catch(err => reject({ code: 500, message: `Unexpected error marking campaign with id ${updateCampaignId} complete: ${err}` }));
                        }
                        return resolve({
                          code: responseOrRequeueCode,
                          message: responseOrRequeueMessage
                        });
                      }).catch(err => reject({ code: 500, message: `Unexpected error checking call with id ${updateCallId} is last call: ${err}` }));
                  }).catch(err => reject({ code: 500, message: `Unexpected error handling post update process for call with id ${updateCallId}: ${err}` }));
              }).catch(err => reject({ code: 500, message: `Unexpected error updating call: ${err}` }));
          }).then((result) => {
            if (result) {
              const { code: resultCode, message: resultMessage } = result;
              code = resultCode;
              message = resultMessage;
            } else {
              code = 500;
              message = 'Unexpectedly unable to update call attempt';
            }
            return res.status(code).json({ message });
          }).catch((err) => {
            if (err) {
              const { code: errCode, message: errMessage } = err;
              code = errCode;
              message = errMessage;
            } else {
              code = 500;
              message = 'Unknown error updating call attempt';
            }
            return res.status(code).json({ message });
          });
        }
        if (!code && !message) {
          if (validationCode && validationMessage) {
            code = validationCode;
            message = validationMessage;
          } else {
            code = 500;
            message = 'Unexpectedly unable to update call attempt';
          }
        }
      }
      return res.status(code).json({ message });
    }).catch(err => res.status(500).json({ message: `Error finding user with id ${updateUserId} in updateAttempt calls controller function: ${err}` }));
}

export function releaseCall(req, res) {
  const updateCallId = parseInt(req.params.call_id, 10);
  const updateUserId = parseInt(req.params.id, 10);
  const updateCampaignId = parseInt(req.params.campaign_id, 10);
  let code;
  let message;

  return usersService.getUserWithCampaignsAndCallsById({ id: updateUserId })
    .then((user) => {
      const { authSuccess, authCode, authMessage } = validateUserAuthorizaion(
        user, updateCampaignId, updateCallId);
      if (!authSuccess) {
        code = authCode;
        message = authMessage;
      } else if (!user.subjectCall.attributes.status === 'ASSIGNED') {
        code = 400;
        message = `Call with id ${updateCallId} does not have status 'ASSIGNED'.`;
      }
      if (code && message) {
        return res.status(code).json({ message });
      }
      return callsService.releaseCall({ id: user.subjectCall.id })
        .then((call) => {
          if (call) {
            code = 200;
            message = 'Call successfully released';
          } else {
            code = 500;
            message = `Unexpectedly unable to release call with id ${updateCallId}.`;
          }
          return res.status(code).json({ message });
        }).catch(err => res.status(500).json({ message: `Error releasing call with id ${updateCallId}: ${err}` }));
    }).catch(err => res.status(500).json({ message: `Error looking up user with id ${updateUserId} while releasing call with id ${updateCallId}: ${err}` }));
}


export function hangUpCall(req, res) {
  const updateUserId = parseInt(req.params.id, 10);
  let code;
  let message;

  return usersService.getUserById({ id: updateUserId })
    .then((user) => {
      if (user) {
        const { call_sid } = user.attributes;
        if (!call_sid) {
          code = 400;
          message = `User with id ${updateUserId} is not currently connected to a call session.`;
        }
        if (code && message) {
          return res.status(code).json({ message });
        }
        return hangUpVolunteerCall(call_sid, updateUserId)
          .then((call) => {
            if (call) {
              return usersService.clearUserCallSID({ updateUserId })
                .then(() => res.status(202).json({ message: 'call succesfully hung up' }))
                .catch(err => res.status(400).json({ message: `Error clearing call sid for user with id ${updateUserId}: ${err}` }));
            }
            code = 500;
            message = `Unexpectedly unable to hang up volunteer call session for user with id ${updateUserId}`;
            return res.status(code).json({ message });
          }).catch(err => res.status(500).json({ message: `Error terminating call session for user with id ${updateUserId}: ${err}` }));
      }
      return res.status(500).json({ message: `Unexpectedly unable to find user with id ${updateUserId} to hang up call session.` });
    }).catch(err => res.status(500).json({ message: `Error finding user with id ${updateUserId} to hang up call session: ${err}` }));
}
