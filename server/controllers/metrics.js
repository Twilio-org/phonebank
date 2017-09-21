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

  return campaignsService.getCampaignById({ id: campaignId })
    .then((response) => {
      const { status } = response.attributes;
      if (checkCampaignNotDraft(status).constructor === Error) {
        // will need status code when they are made
        return res.status(204).json({ message: 'Campaign metrics not available for campaigns still in draft.' });
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
        .catch(err => res.status(500).json({ message: `Could not find campaign ${campaignId} with related calls: ${err}` }));
    })
    .catch((err) => {
      const errorMessage = `could not find campaigin by id in campaign status check (metrics): ${err}`;
      return res.status(500).json({ message: errorMessage });
    });
}
