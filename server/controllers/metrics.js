import campaignsService from '../db/services/campaigns';
import scriptsService from '../db/services/scripts';
import responsesService from '../db/services/responses';

export default function getCampaignMetrics(req, res) {
  const metrics = {
    status_distribution: {},
    outcome_distribution: {},
    response_stats: {}
  };
  const campaignId = parseInt(req.params.id, 10);
  return campaignsService.getCallsByCampaignId({ id: campaignId })
    .then((result) => {
      // script_id is the campaign script id;
      const { script_id } = result.attributes;
      // campaignCalls is an array of call objects;
      const { models: campaignCalls } = result.relations.calls;

      campaignCalls.forEach((call) => {
        const { status, outcome } = call.attributes;
        const statusStats = metrics.status_distribution;
        const outcomeStats = metrics.outcome_distribution;
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

      return scriptsService.getQuestionsByScriptId({ id: script_id })
      .then((questions) => {
        // array of question model objects
        // prop question_id is the questin foreign key
        const { models: questionsArray } = questions;
        Promise.all(questionsArray.map((question) => {
          const { question_id } = question.attributes;
          return responsesService.fetchResponsesByQuestionId({ question_id })
          .then((questionRes) => {
            const { attributes: responseObj } = questionRes.models[0];
            const { question_id: questionId, response } = responseObj;
            const responseStats = metrics.response_stats;
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
          })
          .catch(err => err);
        }))
        .then(() => {
          res.status(200).json(metrics);
        })
        .catch(err => console.log('err with promise.all', err));
      })
      .catch(err => res.status(500).json(err));
    })
    .catch(err => console.log(err));
}
