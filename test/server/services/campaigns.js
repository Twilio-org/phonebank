import { expect, Should } from 'chai';
import campaignsService from '../../../server/db/services/campaigns';
import contactListsService from '../../../server/db/services/contact_lists';
import scriptsService from '../../../server/db/services/scripts';
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
          expect(campaign.attributes.script_id).to.equal(this.campaignParams1.contact_lists_id);
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
          expect(campaign.attributes.script_id).to.equal(this.campaignParams2.contact_lists_id);
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
          expect(models[0].attributes.script_id).to.equal(this.campaignParams2.contact_lists_id);
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
          expect(models[0].attributes.script_id).to.equal(this.campaignParams1.contact_lists_id);
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
          expect(models[0].attributes.script_id).to.equal(this.campaignParams2.contact_lists_id);
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
          expect(campaign.attributes.script_id).to.equal(this.campaignParams1.contact_lists_id);
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

    it('should get campaign by id and related calls: ', (done) => {
      done();
      // getCallsByCampaignId
    });
  });
});
