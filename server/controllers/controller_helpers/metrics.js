import _ from 'lodash';

import responsesService from '../../db/services/responses';
import campaignsService from '../../db/services/campaigns';

function splitResponses(responseString) {
  return responseString.split(',');
}

export function mapCallIds(callObjArray) {
  return callObjArray.map(call => call.attributes.id);
}

export function checkCampaignNotDraft(campaignId, res) {
  return campaignsService.getCampaignById({ id: campaignId })
    .then((campaign) => {
      if (campaign) {
        const { status } = campaign.attributes;
        if (status === 'draft') {
          throw new Error('Campaign metrics not available for campaigns still in draft.');
        }
        return true;
      }
      return res.status(500).json({ message: 'problem with db query for campaign by id' });
    })
    .catch((err) => {
      const errorMessage = `could not find campaigin by id in campaign status check (metrics): ${err}`;
      return res.status(404).json({ message: errorMessage });
    });
}

function createStatusMap(metricsObj) {
  const statusOptions = ['AVAILABLE', 'ASSIGNED', 'IN_PROGRESS', 'HUNG_UP', 'ATTEMPTED'];
  const statusMetrics = metricsObj.status_distribution;
  statusOptions.forEach((statusOption) => {
    statusMetrics[statusOption] = 0;
  });
  return metricsObj;
}

function createOutcomeMap(metricsObj) {
  const outcomeOptions = ['PENDING', 'ANSWERED', 'BAD_NUMBER', 'DO_NOT_CALL', 'LEFT_MSG', 'NO_ANSWER', 'INCOMPLETE'];
  const outcomeMetrics = metricsObj.outcome_distribution;
  outcomeOptions.forEach((outcomeOption) => {
    outcomeMetrics[outcomeOption] = 0;
  });
}

function createResponsesMap(responseArray, questionId, metricsObj) {
  const responseStats = metricsObj.response_stats;
  responseStats[questionId] = {};
  const responsesForQuestion = responseStats[questionId];
  responseArray.forEach((responseOption) => {
    if (responseOption !== '') {
      responsesForQuestion[responseOption] = 0;
    } else {
      delete responseStats[questionId];
    }
  });
  return metricsObj;
}

export function countStatusAndOutcomeFrequency(callsArray, metricsObj) {
  createStatusMap(metricsObj);
  createOutcomeMap(metricsObj);
  callsArray.forEach((call) => {
    const { status, outcome } = call.attributes;
    const statusStats = metricsObj.status_distribution;
    const outcomeStats = metricsObj.outcome_distribution;
    if (Object.prototype.hasOwnProperty.call(statusStats, status)) {
      statusStats[status] += 1;
    }
    if (Object.prototype.hasOwnProperty.call(outcomeStats, outcome)) {
      outcomeStats[outcome] += 1;
    }
  });
  return metricsObj;
}

function countResponseFrequency(responsesArray, metricsObj, questionId) {
  const responses = responsesArray
    .map(responseObj => splitResponses(responseObj.attributes.response));
  const flattenedResponses = _.flatten(responses);
  flattenedResponses.forEach((response) => {
    const responseStats = metricsObj.response_stats;
    if (Object.prototype.hasOwnProperty.call(responseStats, questionId)) {
      const currentQuestion = responseStats[questionId];
      if (Object.prototype.hasOwnProperty.call(currentQuestion, response)) {
        responseStats[questionId][response] += 1;
      }
    }
  });
  return metricsObj;
}

export function handleQuestionResponses(questionsArray, metricsObj, calls_array, res) {
  Promise.all(questionsArray.map((question) => {
    const { question_id, responses: responseOptionString } = question.attributes;
    const responseOptions = splitResponses(responseOptionString);
    createResponsesMap(responseOptions, question_id, metricsObj);

    return responsesService.fetchResponesByQuestionCallId({ calls_array, question_id })
    .then((responsesRes) => {
      const { models: responseCollection } = responsesRes;
      return countResponseFrequency(responseCollection, metricsObj, question_id);
    })
    .catch((err) => {
      res.status(404).json({ message: `couldn't find responses by question id: ${err}` });
    });
  }))
  .then(() => {
    res.status(200).json({ message: 'metrics generated successfully', metricsObj });
  })
  .catch(err => res.status(404).json({ message: `Problem fetching responses by question id: ${err}` }));
}
