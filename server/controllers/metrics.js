import campaignsService from '../db/services/campaigns';
import scriptsService from '../db/services/scripts';
import responsesService from '../db/services/responses';

function checkCampaignNotDraft(campaignId, res) {
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

function statusAndOutcomeFrequencyMap(callsArray, metricsObj) {
  callsArray.forEach((call) => {
    const { status, outcome } = call.attributes;
    const statusStats = metricsObj.status_distribution;
    const outcomeStats = metricsObj.outcome_distribution;
    if (statusStats[status]) {
      statusStats[status] += 1;
    } else {
      statusStats[status] = 1;
    }
    if (outcomeStats[outcome]) {
      outcomeStats[outcome] += 1;
    } else {
      outcomeStats[outcome] = 1;
    }
  });
  return metricsObj;
}

function responseFrequencyMap(responsesArray, metricsObj) {
  responsesArray.forEach((responseObj) => {
    const { question_id: questionId, response } = responseObj.attributes;
    const responseStats = metricsObj.response_stats;
    if (responseStats[questionId]) {
      if (responseStats[questionId][response]) {
        responseStats[questionId][response] += 1;
      } else {
        responseStats[questionId][response] = 1;
      }
    } else {
      responseStats[questionId] = {};
      responseStats[questionId][response] = 1;
    }
  });
  return metricsObj;
}

function handleQuestionResponses(questionsArray, metricsObj, res) {
  Promise.all(questionsArray.map((question) => {
    const { question_id } = question.attributes;
    return responsesService.fetchResponsesByQuestionId({ question_id })
    .then((responsesRes) => {
      const { models: responseCollection } = responsesRes;
      return responseFrequencyMap(responseCollection, metricsObj);
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

export default function getCampaignMetrics(req, res) {
  const metrics = {
    status_distribution: {},
    outcome_distribution: {},
    response_stats: {}
  };
  const campaignId = parseInt(req.params.id, 10);
  try {
    checkCampaignNotDraft(campaignId);
  } catch (e) {
    return res.status(400).json({ message: e });
  }
  return campaignsService.getCallsByCampaignId({ id: campaignId })
    .then((result) => {
      const { script_id } = result.attributes;
      const { models: campaignCalls } = result.relations.calls;
      statusAndOutcomeFrequencyMap(campaignCalls, metrics);
      return scriptsService.getQuestionsByScriptId({ id: script_id })
      .then((questions) => {
        const { models: questionsArray } = questions;
        return handleQuestionResponses(questionsArray, metrics, res);
      })
      .catch(err => res.status(400).json({ message: err }));
    })
    .catch(err => res.status(404).json({ message: `Could not find campaign ${campaignId} with related calls: ${err}` }));
}
