import { expect } from 'chai';
import cleanUp from '../bootstrap';
import Call from '../../../server/db/services/calls';
import Contact from '../../../server/db/services/contacts';
import Campaign from '../../../server/db/services/campaigns';
import Script from '../../../server/db/services/scripts';
import ContactList from '../../../server/db/services/contact_lists';

describe('Calls Service tests', () => {
  describe('Data insertion', function() {
    before((done) => {
      this.contactListParam = {
        name: 'Millbrae Phone List 10'
      };

      this.campaignParams = {
        name: 'testCampaign7',
        title: 'Test7',
        description: 'election',
        status: 'active'
      };

      this.scriptParams = {
        name: 'Script Name 7',
        body: 'Script Body 7',
        description: 'Script Description 7'
      };

      this.contactSaveParams = {
        first_name: 'Katie',
        last_name: 'Smith',
        phone_number: '+11820020000',
        email: 'katie@gmail.com',
        external_id: 'test12345'
      };

      this.callSaveParams = {};

      Script.saveNewScript(this.scriptParams)
        .then((script) => {
          this.campaignParams.script_id = script.attributes.id;
          ContactList.saveNewContactList(this.contactListParam)
            .then((contactList) => {
              this.campaignParams.contact_lists_id = contactList.attributes.id;
              Campaign.saveNewCampaign(this.campaignParams)
                .then((campaign) => {
                  this.callSaveParams.campaign_id = campaign.attributes.id;
                  Contact.saveNewContact(this.contactSaveParams)
                    .then((contact) => {
                      this.callSaveParams.contact_id = contact.attributes.id;
                      done();
                    });
                });
            });
        });
    });

    after((done) => {
      cleanUp(done);
    });

    it('should correctly populate a call', (done) => {
      Call.populateCall(this.callSaveParams)
        .then((call) => {
          expect(call.attributes.campaign_id).to.equal(this.callSaveParams.campaign_id);
          expect(call.attributes.contact_id).to.equal(this.callSaveParams.contact_id);
          done();
        }, done);
    });
  });
});
