import { expect } from 'chai';
import campaignsService from '../../../server/db/services/campaigns';
import contactListsService from '../../../server/db/services/contact_lists';
import scriptsService from '../../../server/db/services/scripts';
import Call from '../../../server/db/models/calls';
import Contact from '../../../server/db/models/contacts';
import User from '../../../server/db/models/users';
import Response from '../../../server/db/models/responses';
import Question from '../../../server/db/models/questions';
import cleanUp from '../bootstrap';

describe('Campaign service tests', () => {
  after((done) => {
    cleanUp(done);
  });
  describe('Data insertion', function() {
    before((done) => {
      this.scriptParams = {
        name: 'testScript',
        body: 'Hello, my name is Joe',
        description: 'Greetings'
      };

      this.contactListParams = {
        name: 'testContactList'
      };

      this.campaignParams1 = {
        name: 'testCampaign1',
        title: 'Test1',
        description: 'election',
        status: 'draft'
      };

      this.campaignParams2 = {
        name: 'testCampaign2',
        title: 'Test2',
        description: 'reelection',
        status: 'active'
      };

      this.campaignParams3 = {
        name: 'testCampaign3',
        title: 'Test3',
        description: 'election',
        status: 'draft'
      };

      this.contactParams = {
        external_id: null,
        first_name: 'Abigayle',
        last_name: null,
        email: null,
        phone_number: '555-555-5051',
        is_invalid_number: false,
        do_not_call: false
      };

      this.callParams = {
        attempt_num: '1',
        user_id: null,
        status: 'ATTEMPTED',
        outcome: 'ANSWERED',
        notes: 'This contact was unsavory.',
        call_sid: 'CAd4d3718eaa93382304759338a37fbb99',
        duration: 351
      };

      this.userParams = {
        first_name: 'test',
        last_name: 'user',
        email: 'test@gmail.com',
        phone_number: '+15555555555',
        password_hash: 'password'
      };

      this.questionParams = {
        title: 'question title 1',
        description: 'question description 1',
        type: 'paragraph',
        responses: ''
      };

      this.responseParams = {
        response: 'I don\'t like paragraphs'
      };

      scriptsService.saveNewScript(this.scriptParams)
        .then((script) => {
          this.campaignParams1.script_id = script.attributes.id;
          this.campaignParams2.script_id = script.attributes.id;
          this.campaignParams3.script_id = script.attributes.id;
          contactListsService.saveNewContactList(this.contactListParams)
            .then((contactList) => {
              this.campaignParams1.contact_lists_id = contactList.attributes.id;
              this.campaignParams2.contact_lists_id = contactList.attributes.id;
              this.campaignParams3.contact_lists_id = contactList.attributes.id;
              done();
            });
        });
    });

    it('should save new campaign', (done) => {
      campaignsService.saveNewCampaign(this.campaignParams1)
        .then((campaign) => {
          this.campaign1id = campaign.id;
          expect(campaign.attributes.name).to.equal(this.campaignParams1.name);
          expect(campaign.attributes.title).to.equal(this.campaignParams1.title);
          expect(campaign.attributes.description).to.equal(this.campaignParams1.description);
          expect(campaign.attributes.status).to.equal(this.campaignParams1.status);
          expect(campaign.attributes.script_id).to.equal(this.campaignParams1.script_id);
          expect(campaign.attributes.contact_lists_id).to.equal(this.campaignParams1.contact_lists_id);
          done();
        });
    });

    it('should save another new campaign', (done) => {
      campaignsService.saveNewCampaign(this.campaignParams2)
        .then((campaign) => {
          expect(campaign.attributes.name).to.equal(this.campaignParams2.name);
          expect(campaign.attributes.title).to.equal(this.campaignParams2.title);
          expect(campaign.attributes.description).to.equal(this.campaignParams2.description);
          expect(campaign.attributes.status).to.equal(this.campaignParams2.status);
          expect(campaign.attributes.script_id).to.equal(this.campaignParams2.script_id);
          expect(campaign.attributes.contact_lists_id).to.equal(this.campaignParams2.contact_lists_id);
          done();
        });
    });

    it('should get all campaigns', (done) => {
      const status = 'all';
      campaignsService.getAllCampaigns(status)
        .then((campaigns) => {
          const { models } = campaigns;
          expect(models).to.have.length(2);
          expect(models[1].attributes.name).to.equal(this.campaignParams1.name);
          expect(models[1].attributes.title).to.equal(this.campaignParams1.title);
          expect(models[1].attributes.description).to.equal(this.campaignParams1.description);
          expect(models[1].attributes.status).to.equal(this.campaignParams1.status);
          expect(models[1].attributes.script_id).to.equal(this.campaignParams1.script_id);
          expect(models[1].attributes.script_id).to.equal(this.campaignParams1.contact_lists_id);
          expect(models[0].attributes.name).to.equal(this.campaignParams2.name);
          expect(models[0].attributes.title).to.equal(this.campaignParams2.title);
          expect(models[0].attributes.description).to.equal(this.campaignParams2.description);
          expect(models[0].attributes.status).to.equal(this.campaignParams2.status);
          expect(models[0].attributes.script_id).to.equal(this.campaignParams2.script_id);
          expect(models[0].attributes.contact_lists_id).to.equal(this.campaignParams2.contact_lists_id);
          done();
        });
    });
    it('should get all draft campaigns', (done) => {
      const status = 'draft';
      campaignsService.getAllCampaigns(status)
        .then((campaigns) => {
          const { models } = campaigns;
          expect(models).to.have.length(1);
          expect(models[0].attributes.name).to.equal(this.campaignParams1.name);
          expect(models[0].attributes.title).to.equal(this.campaignParams1.title);
          expect(models[0].attributes.description).to.equal(this.campaignParams1.description);
          expect(models[0].attributes.status).to.equal(this.campaignParams1.status);
          expect(models[0].attributes.script_id).to.equal(this.campaignParams1.script_id);
          expect(models[0].attributes.contact_lists_id).to.equal(this.campaignParams1.contact_lists_id);
          done();
        });
    });
    it('should get all active campaigns', (done) => {
      const status = 'active';
      campaignsService.getAllCampaigns(status)
        .then((campaigns) => {
          const { models } = campaigns;
          expect(models).to.have.length(1);
          expect(models[0].attributes.name).to.equal(this.campaignParams2.name);
          expect(models[0].attributes.title).to.equal(this.campaignParams2.title);
          expect(models[0].attributes.description).to.equal(this.campaignParams2.description);
          expect(models[0].attributes.status).to.equal(this.campaignParams2.status);
          expect(models[0].attributes.script_id).to.equal(this.campaignParams2.script_id);
          expect(models[0].attributes.contact_lists_id).to.equal(this.campaignParams2.contact_lists_id);
          done();
        });
    });
    it('should get a campaign by its id', (done) => {
      const id = this.campaign1id;
      campaignsService.getCampaignById({ id })
        .then((campaign) => {
          expect(campaign.id).to.equal(id);
          expect(campaign.attributes.name).to.equal(this.campaignParams1.name);
          expect(campaign.attributes.title).to.equal(this.campaignParams1.title);
          expect(campaign.attributes.description).to.equal(this.campaignParams1.description);
          expect(campaign.attributes.status).to.equal(this.campaignParams1.status);
          expect(campaign.attributes.script_id).to.equal(this.campaignParams1.script_id);
          expect(campaign.attributes.contact_lists_id).to.equal(this.campaignParams1.contact_lists_id);
          done();
        });
    });
    it('should update a campaign with status: ', (done) => {
      campaignsService.saveNewCampaign(this.campaignParams3)
        .then((campaign) => {
          const { id } = campaign.attributes;
          const updateParams1 = {
            id,
            status: 'active',
            name: 'new campaign name',
            title: 'new campaign title',
            description: 'new campaign description',
            contact_lists_id: 2,
            script_id: 2
          };
          return campaignsService.updateCampaignById(updateParams1)
            .then((updatedCampaign) => {
              const { status,
                      name,
                      title,
                      description,
                      contact_lists_id,
                      script_id,
                      id: campaign_id } = updatedCampaign.attributes;
              expect(campaign_id).to.equal(this.campaignParams3.id);
              expect(status).to.equal(updateParams1.status);
              expect(name).to.equal(updateParams1.name);
              expect(title).to.equal(updateParams1.title);
              expect(description).to.equal(updateParams1.description);
              expect(contact_lists_id).to.equal(updateParams1.contact_lists_id);
              expect(script_id).to.equal(updateParams1.script_id);
              done();
            }, done);
        }, done)
        .catch(err => err);
    });
    it('should fetch a campaign with related calls and related responses', (done) => {
      new Contact(this.contactParams).save()
        .then((contact) => {
          this.callParams.contact_id = contact.id;
          return new User(this.userParams).save()
            .then((user) => {
              this.callParams.user_id = user.id;
              this.callParams.campaign_id = this.campaign1id;
              return new Question(this.questionParams).save()
                .then((question) => {
                  this.responseParams.question_id = question.id;
                  return new Call(this.callParams).save()
                    .then((call) => {
                      this.responseParams.question_id = question.id;
                      this.responseParams.call_id = call.id;
                      return new Response(this.responseParams).save()
                        .then((response) => {
                          campaignsService.getExportableCampaignDataById({ id: this.campaign1id })
                            .then((campaign) => {
                              const relatedCall = campaign.relations.calls.models[0];
                              const relatedResponse = relatedCall.relations.responses.models[0];
                              expect(relatedResponse.attributes.id)
                                .to.equal(response.attributes.id);
                              expect(relatedResponse.attributes.question_id)
                                .to.equal(response.attributes.question_id);
                              expect(relatedResponse.attributes.call_id)
                                .to.equal(response.attributes.call_id);
                              expect(relatedResponse.attributes.response)
                                .to.equal(response.attributes.response);
                              expect(relatedCall.attributes.id)
                                .to.equal(call.attributes.id);
                              expect(relatedCall.attributes.camapaign_id)
                                .to.equal(call.attributes.camapaign_id);
                              expect(relatedCall.attributes.contact_id)
                                .to.equal(call.attributes.contact_id);
                              expect(relatedCall.attributes.attempt_num)
                                .to.equal(call.attributes.attempt_num);
                              expect(relatedCall.attributes.user_id)
                                .to.equal(call.attributes.user_id);
                              expect(relatedCall.attributes.status)
                                .to.equal(call.attributes.status);
                              expect(relatedCall.attributes.outcome)
                                .to.equal(call.attributes.outcome);
                              expect(relatedCall.attributes.notes)
                                .to.equal(call.attributes.notes);
                              expect(relatedCall.attributes.call_sid)
                                .to.equal(call.attributes.call_sid);
                              expect(relatedCall.attributes.duration)
                                .to.equal(call.attributes.duration);
                              done();
                            }, done);
                        });
                    });
                });
            });
          });
      });
    it('should update campaign status to completed', (done) => {
      const id = this.campaign1id;
      campaignsService.markCampaignAsCompleted({ id })
        .then((campaign) => {
          expect(campaign.attributes.status).to.equal('completed');
          done();
        });
    });
    it('should not update the rest of the campaign attributes when the status is updated', (done) => {
      const id = this.campaign1id;
      campaignsService.getCampaignById({ id })
        .then((campaign) => {
          expect(campaign.id).to.equal(id);
          expect(campaign.attributes.name).to.equal(this.campaignParams1.name);
          expect(campaign.attributes.title).to.equal(this.campaignParams1.title);
          expect(campaign.attributes.description).to.equal(this.campaignParams1.description);
          expect(campaign.attributes.status).to.equal('completed');
          expect(campaign.attributes.script_id).to.equal(this.campaignParams1.script_id);
          expect(campaign.attributes.contact_lists_id).to.equal(this.campaignParams1.contact_lists_id);
          done();
        });
    });
  });
});
