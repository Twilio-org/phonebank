import { expect, Should } from 'chai';
import Campaign from '../../../server/db/models/campaigns';

const campaignRelationFixtureMock = {
  calls: [
    {
      attributes: {
        campaign_id: 1,
        contact_id: 1,
        attempt_num: '1',
        user_id: 3,
        status: 'ATTEMPTED',
        outcome: 'ANSWERED',
        notes: null,
        call_sid: 'CA09638d6a3e16bb761cc50e050f0b5840',
        call_started: null,
        call_ended: null,
        call_id: 1,
        call_updated_at: '2017-09-18T23:57:51.036Z',
        call_created_at: '2017-09-18T23:57:51.036Z'
      },
      relations: {
        responses: {
          length: 3,
          models: [
            {
              attributes: {
                id: 1,
                question_id: 1,
                call_id: 1,
                response: 'resp1',
                created_at: '2017-09-19T00:00:00.803Z',
                updated_at: '2017-09-19T00:00:00.803Z'
              }
            },
            {
              attributes: {
                id: 2,
                question_id: 2,
                call_id: 1,
                response: 'resp2,resp3',
                created_at: '2017-09-19T00:00:00.803Z',
                updated_at: '2017-09-19T00:00:00.803Z'
              }
            },
            {
              attributes: {
                id: 1,
                question_id: 1,
                call_id: 1,
                response: 'resp1',
                created_at: '2017-09-19T00:00:00.803Z',
                updated_at: '2017-09-19T00:00:00.803Z'
              }
            }
          ]
        }
      }
    }
  ]
};
const expectedCsvString = 'campaign_id,contact_id,attempt_num,user_id,status,outcome,notes,call_sid,call_started,call_ended,call_id,call_updated_at,call_created_at,response_1_id,response_1_updated_at,response_1_created_at,response_1_response,response_1_question_id,response_2_id,response_2_updated_at,response_2_created_at,response_2_response,response_2_question_id,response_3_id,response_3_updated_at,response_3_created_at,response_3_response,response_3_question_id\n1,1,1,3,ATTEMPTED,ANSWERED,,CA09638d6a3e16bb761cc50e050f0b5840,,,,,,1,2017-09-19T00:00:00.803Z,2017-09-19T00:00:00.803Z,resp1,1,2,2017-09-19T00:00:00.803Z,2017-09-19T00:00:00.803Z,resp2,resp3,2,1,2017-09-19T00:00:00.803Z,2017-09-19T00:00:00.803Z,resp1,1';
const campaign = new Campaign();

campaign.relations = campaignRelationFixtureMock;

describe('Campaign Model Tests', function() {
  describe('Exporting Campaign Data', function() {
    it('exports campaign data', (done) => {
      expect(campaign.getExport()).to.equal(expectedCsvString);
      done();
    });
  });
});
