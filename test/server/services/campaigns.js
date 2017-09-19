import { expect, Should } from 'chai';
import campaignsService from '../../../server/db/services/campaigns';
import contactListsService from '../../../server/db/services/contact_lists';
import scriptsService from '../../../server/db/services/scripts';
import callsService from '../../../server/db/services/calls';
import contactsService from '../../../server/db/services/contacts';
import cleanUp from '../bootstrap';

const should = Should();

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

      this.campaignParams4 = {
        name: 'testCampaign4',
        title: 'Test4',
        description: 'election',
        status: 'active'
      };

      this.userSaveParams = {
        firstName: 'John',
        lastName: 'Doe',
        password: 'hatch',
        phoneNumber: '+14441114444',
        email: 'John@gmail.com'
      };

      this.callSaveParams = {};

      this.campaignSaveParams4 = {};

      this.contactSaveParams = [
        {
          first_name: 'Katie',
          last_name: 'Smith',
          phone_number: '+11820020000',
          email: 'katie@gmail.com',
          external_id: 'test12345'
        },
        {
          first_name: 'Susan',
          last_name: 'Mau',
          phone_number: '+11820024444',
          email: 'katie@gmail.com',
          external_id: 'test12345'
        },
        {
          first_name: 'Aaron',
          last_name: 'Smith',
          phone_number: '+11820026666',
          email: 'katie@gmail.com',
          external_id: 'test12345'
        }
      ];

      scriptsService.saveNewScript(this.scriptParams)
        .then((script) => {
          this.campaignParams1.script_id = script.attributes.id;
          this.campaignParams2.script_id = script.attributes.id;
          this.campaignParams3.script_id = script.attributes.id;
          this.campaignParams4.script_id = script.attributes.id;
          contactListsService.saveNewContactList(this.contactListParams)
            .then((contactList) => {
              this.campaignParams1.contact_lists_id = contactList.attributes.id;
              this.campaignParams2.contact_lists_id = contactList.attributes.id;
              this.campaignParams3.contact_lists_id = contactList.attributes.id;
              this.campaignParams4.contact_lists_id = contactList.attributes.id;

              campaignsService.saveNewCampaign(this.campaignParams4)
                .then((campaign) => {
                  this.campaignSaveParams4.id = campaign.attributes.id;
                  this.campaignSaveParams4.name = campaign.attributes.name;
                  this.callSaveParams = [];
                  for (let i = 0; i < 3; i += 1) {
                    this.callSaveParams.push({ campaign_id: campaign.attributes.id });
                  }
                  Promise.all(this.contactSaveParams.map((contact, index) => {
                    return contactsService.saveNewContact(contact)
                      .then((newContact) => {
                        this.callSaveParams[index].contact_id = newContact.attributes.id;
                      });
                  }))
                  .then(() => {
                    Promise.all(this.callSaveParams.map((call, index) => {
                      return callsService.populateCall(call)
                        .then((populatedCall) => {
                          const { campaign_id, id } = populatedCall.attributes;
                          this.callSaveParams[index].campaign_id = campaign_id;
                          this.callSaveParams[index].id = id;
                          return populatedCall.attributes;
                        });
                    }))
                      .then((populatedCalls) => {
                        if (populatedCalls) done();
                      });
                  });
                });
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
          expect(campaign.attributes.script_id).to.equal(this.campaignParams1.contact_lists_id);
          done();
        })
        .catch(err => console.log(err));
    });

    it('should save another new campaign', (done) => {
      campaignsService.saveNewCampaign(this.campaignParams2)
        .then((campaign) => {
          expect(campaign.attributes.name).to.equal(this.campaignParams2.name);
          expect(campaign.attributes.title).to.equal(this.campaignParams2.title);
          expect(campaign.attributes.description).to.equal(this.campaignParams2.description);
          expect(campaign.attributes.status).to.equal(this.campaignParams2.status);
          expect(campaign.attributes.script_id).to.equal(this.campaignParams2.script_id);
          expect(campaign.attributes.script_id).to.equal(this.campaignParams2.contact_lists_id);
          done();
        })
        .catch(err => console.log(err));
    });

    it('should get all campaigns', (done) => {
      const status = 'all';
      campaignsService.getAllCampaigns(status)
        .then((campaigns) => {
          const { models } = campaigns;
          expect(models).to.have.length(3);
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
          expect(models[0].attributes.script_id).to.equal(this.campaignParams2.contact_lists_id);
          done();
        })
        .catch(err => console.log(err));
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
          expect(models[0].attributes.script_id).to.equal(this.campaignParams1.contact_lists_id);
          done();
        })
        .catch(err => console.log(err));
    });
    it('should get all active campaigns', (done) => {
      const status = 'active';
      campaignsService.getAllCampaigns(status)
        .then((campaigns) => {
          const { models } = campaigns;
          expect(models).to.have.length(2);
          expect(models[0].attributes.name).to.equal(this.campaignParams2.name);
          expect(models[0].attributes.title).to.equal(this.campaignParams2.title);
          expect(models[0].attributes.description).to.equal(this.campaignParams2.description);
          expect(models[0].attributes.status).to.equal(this.campaignParams2.status);
          expect(models[0].attributes.script_id).to.equal(this.campaignParams2.script_id);
          expect(models[0].attributes.script_id).to.equal(this.campaignParams2.contact_lists_id);
          done();
        })
        .catch(err => console.log(err));
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
          expect(campaign.attributes.script_id).to.equal(this.campaignParams1.contact_lists_id);
          done();
        })
        .catch(err => console.log(err));
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
        .catch(err => console.log(err));
    });

    it('should get campaign by id and related calls: ', (done) => {
      const { id } = this.campaignSaveParams4;
      campaignsService.getCallsByCampaignId({ id })
        .then((campaignWithCalls) => {
          const { attributes: campaignResult } = campaignWithCalls;
          const { models: callModelsArray } = campaignWithCalls.relations.calls;
          const callsArray = callModelsArray.map((call) => {
            const result = {
              id: call.attributes.id,
              campaign_id: call.attributes.campaign_id,
              contact_id: call.attributes.contact_id,
              attempt_num: call.attributes.attempt_num,
              user_id: call.attributes.user_id,
              status: call.attributes.status,
              outcome: call.attributes.outcome,
              notes: call.attributes.notes,
              call_sid: call.attributes.call_sid,
              duration: call.attributes.duration
            };
            return result;
          });
          const callsAreFromSameCampaign = callsArray.reduce((accum, currCall) => {
            return currCall.campaign_id === id;
          }, true);
          expect(campaignResult.id).to.equal(this.campaignSaveParams4.id);
          expect(campaignResult.name).to.equal(this.campaignSaveParams4.name);
          expect(callsArray.length).to.equal(3);
          expect(callsAreFromSameCampaign).to.equal(true);

          done();
        }, done)
        .catch(err => console.log(err));
    });
  });
});
