import campaignsService from '../db/services/campaigns';
import scriptsService from '../db/services/scripts';

import { checkCampaignNotDraft, countStatusAndOutcomeFrequency, handleQuestionResponses, mapCallIds } from './controller_helpers/metrics';

export default function getCampaignMetrics(req, res) {
  const metrics = {
    status_distribution: {},
    outcome_distribution: {},
    response_stats: {}
  };
  const campaignId = parseInt(req.params.id, 10);
  try {
    checkCampaignNotDraft(campaignId, res);
  } catch (e) {
    return res.status(400).json({ message: e });
  }
  return campaignsService.getCallsByCampaignId({ id: campaignId })
    .then((result) => {
      const { script_id } = result.attributes;
      // calls array:
      const { models: campaignCalls } = result.relations.calls;
      const callIdMap = mapCallIds(campaignCalls);
      countStatusAndOutcomeFrequency(campaignCalls, metrics);
      return scriptsService.getQuestionsByScriptId({ id: script_id })
      .then((questions) => {
        const { models: questionsArray } = questions;

        return handleQuestionResponses(questionsArray, metrics, callIdMap, res);
      })
      .catch(err => res.status(400).json({ message: err }));
    })
    .catch(err => res.status(404).json({ message: `Could not find campaign ${campaignId} with related calls: ${err}` }));
}
