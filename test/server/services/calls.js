<<<<<<< Updated upstream
import { expect } from 'chai';
import cleanUp from '../bootstrap';
import Call from '../../../server/db/services/calls';
import Contact from '../../../server/db/services/contacts';
import Campaign from '../../../server/db/services/campaigns';
import Script from '../../../server/db/services/scripts';
import ContactList from '../../../server/db/services/contact_lists';
=======
/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
import { expect } from 'chai';
import callsService from '../../../server/db/services/calls';
import campaignsService from '../../../server/db/services/campaigns';
import cleanUp from '../bootstrap';
import contactListsService from '../../../server/db/services/contact_lists';
import contactsService from '../../../server/db/services/contacts';
import scriptsService from '../../../server/db/services/scripts';
import usersService from '../../../server/db/services/users';
>>>>>>> Stashed changes

describe('Calls Service tests', () => {
  after((done) => {
    cleanUp(done);
  });
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

<<<<<<< Updated upstream
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
=======
      this.userSaveParams = {
        firstName: 'John',
        lastName: 'Doe',
        password: 'hatch',
        phoneNumber: '+14441114444',
        email: 'John@gmail.com'
      };

      this.callSaveParams = {};

      scriptsService.saveNewScript(this.scriptParams)
        .then((script) => {
          this.campaignParams.script_id = script.attributes.id;
          contactListsService.saveNewContactList(this.contactListParam)
            .then((contactList) => {
              this.campaignParams.contact_lists_id = contactList.attributes.id;
              campaignsService.saveNewCampaign(this.campaignParams)
                .then((campaign) => {
                  this.callSaveParams.campaign_id = campaign.attributes.id;
                  contactsService.saveNewContact(this.contactSaveParams)
                    .then((contact) => {
                      this.callSaveParams.contact_id = contact.attributes.id;
                      usersService.saveNewUser(this.userSaveParams)
                      .then((user) => {
                        this.callSaveParams.user_id = user.attributes.id;
                        done();
                      });
>>>>>>> Stashed changes
                    });
                });
            });
        });
    });

    it('should correctly populate a call', (done) => {
<<<<<<< Updated upstream
      Call.populateCall(this.callSaveParams)
=======
      callsService.populateCall(this.callSaveParams)
>>>>>>> Stashed changes
        .then((call) => {
          expect(call.attributes.campaign_id).to.equal(this.callSaveParams.campaign_id);
          expect(call.attributes.contact_id).to.equal(this.callSaveParams.contact_id);
          done();
        }, done);
    });
<<<<<<< Updated upstream
=======

    it('should return an assigned call', (done) => {
      const { user_id, campaign_id } = this.callSaveParams;
      callsService.assignCall({ user_id, campaign_id })
        .then((call) => {
          expect(call.attributes.user_id).to.equal(this.userSaveParams.user_id);
          expect(call.attributes.status).to.equal('assigned');
          done();
        }, done);
    });
>>>>>>> Stashed changes
  });
});
