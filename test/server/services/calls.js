import { expect } from 'chai';
import callsService from '../../../server/db/services/calls';
import campaignsService from '../../../server/db/services/campaigns';
import cleanUp from '../bootstrap';
import contactListsService from '../../../server/db/services/contact_lists';
import contactsService from '../../../server/db/services/contacts';
import scriptsService from '../../../server/db/services/scripts';
import usersService from '../../../server/db/services/users';

describe('Calls Service tests', function() {
  after((done) => {
    cleanUp(done);
  });

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

    this.userSaveParams = {
      firstName: 'John',
      lastName: 'Doe',
      password: 'hatch',
      phoneNumber: '+14441114444',
      email: 'John@gmail.com'
    };

    this.callSaveParams = {};

    this.callUpdateParams = { call_sid: 'CA1a2b3c4aftd152e566f77g8hi48r9403' };

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
                  });
              });
          });
      });
  });

  describe('Data insertion', () => {
    it('should correctly populate a call', (done) => {
      callsService.populateCall(this.callSaveParams)
        .then((call) => {
          this.callUpdateParams.id = call.attributes.id;
          expect(call.attributes.campaign_id).to.equal(this.callSaveParams.campaign_id);
          expect(call.attributes.contact_id).to.equal(this.callSaveParams.contact_id);
          done();
        }, done);
    });
  });

  describe('Call update', () => {
    it('should correctly update call Sid', (done) => {
      callsService.updateContactCallSid(this.callUpdateParams)
        .then((call) => {
          expect(call.attributes.id).to.equal(this.callUpdateParams.id);
          expect(call.attributes.call_sid).to.equal(this.callUpdateParams.call_sid);
          done();
        }, done);
    });
  });

  describe('call assignment', () => {
    it('should return an assigned call', (done) => {
      const { user_id, campaign_id } = this.callSaveParams;

      callsService.assignCall({ user_id, campaign_id })
        .then((call) => {
          expect(call.attributes.user_id).to.equal(this.callSaveParams.user_id);
          expect(call.attributes.status).to.equal('ASSIGNED');
          done();
        }, done);
    });
  });

  describe('call fetching by id', () => {
    before((done) => {
      this.contactSaveParams1 = {
        first_name: 'Another',
        last_name: 'Name',
        phone_number: '+11820020001',
        email: 'another@gmail.com',
        external_id: 'test12345'
      };
      contactsService.saveNewContact(this.contactSaveParams1)
      .then((contact) => {
        this.callSaveParams.contact_id = contact.id;
        callsService.populateCall(this.callSaveParams)
          .then((call) => {
            this.callSaveParams.call_id = call.id;
            done();
          }, done);
      }, done);
    });

    it('should return a saved call by its id', (done) => {
      const id = this.callSaveParams.call_id;

      callsService.getCallById({ id })
        .then((call) => {
          const propList = Object.keys(call.attributes);

          expect(call.attributes.id).to.equal(id);
          expect(propList.includes('campaign_id')).to.equal(true);
          expect(propList.includes('contact_id')).to.equal(true);
          expect(propList.includes('attempt_num')).to.equal(true);
          expect(propList.includes('user_id')).to.equal(true);
          expect(propList.includes('status')).to.equal(true);
          expect(propList.includes('outcome')).to.equal(true);
          expect(propList.includes('notes')).to.equal(true);
          expect(propList.includes('call_sid')).to.equal(true);
          expect(propList.includes('call_started')).to.equal(true);
          expect(propList.includes('call_ended')).to.equal(true);
          done();
        }, done);
    });
  });

  describe('call attempt recording', () => {
    before((done) => {
      const { user_id, campaign_id } = this.callSaveParams;

      callsService.assignCall({ user_id, campaign_id })
        .then((call) => {
          this.callSaveParams.call_id = call.id;
          done();
        });
    });

    it('should set a call\'s status to attempted, outcome to what was passed, and notes to what was passed', (done) => {
      const attemptedCallParams = {
        id: this.callSaveParams.call_id,
        notes: 'these are some notes',
        outcome: 'ANSWERED'
      };

      callsService.recordAttempt(attemptedCallParams)
        .then(() => {
          callsService.getCallById({ id: attemptedCallParams.id })
            .then((call) => {
              expect(call.attributes.status).to.equal('ATTEMPTED');
              expect(call.attributes.outcome).to.equal(attemptedCallParams.outcome);
              expect(call.attributes.notes).to.equal(attemptedCallParams.notes);
              done();
            });
        }, done);
    });
  });

  describe('updating call status (updateCallStatus): ', () => {
    before((done) => {
      const { user_id, campaign_id } = this.callSaveParams;
      this.contactSaveParams3 = {
        first_name: 'Oh',
        last_name: 'Hey',
        phone_number: '+11820020002',
        email: 'Hiiii@gmail.com',
        external_id: 'test12345'
      };
      contactsService.saveNewContact(this.contactSaveParams3)
        .then((contact) => {
          this.callSaveParams.contact_id = contact.id;
          callsService.populateCall(this.callSaveParams)
            .then((call) => {
              callsService.assignCall({ user_id, campaign_id })
                .then((call) => {
                  this.callSaveParams.call_id = call.id;
                  this.callSaveParams.status = call.status;
                  done();
                }, done);
            }, done);
        }, done);
    });
    it('should do important things: ', (done) => {
      const { call_id } = this.callSaveParams;
      const updateParams = { id: call_id, status: 'IN_PROGRESS' };
      callsService.updateCallStatus(updateParams)
        .then((call) => {
          const { status } = call.attributes;
          expect(status).to.not.equal(this.callSaveParams.status);
          expect(status).to.equal('IN_PROGRESS');
          done();
        }, done)
        .catch(err => err);
    });
  });

  describe('call releasing', () => {
    before((done) => {
      const { user_id, campaign_id } = this.callSaveParams;

      this.contactSaveParams2 = {
        first_name: 'Yet',
        last_name: 'Another',
        phone_number: '+11820020002',
        email: 'yet@gmail.com',
        external_id: 'test12345'
      };
      contactsService.saveNewContact(this.contactSaveParams2)
        .then((contact) => {
          this.callSaveParams.contact_id = contact.id;
          callsService.populateCall(this.callSaveParams)
            .then((call) => {
              callsService.assignCall({ user_id, campaign_id })
                .then((call) => {
                  this.callSaveParams.call_id = call.id;
                  done();
                }, done);
            }, done);
        }, done);
    });

    it('should set a call\'s status to \'AVAILABLE\' and user_id to null', (done) => {
      const attemptedCallParams = {
        id: this.callSaveParams.call_id,
        notes: 'these are some notes',
        outcome: 'ANSWERED'
      };

      callsService.releaseCall(attemptedCallParams)
        .then((call) => {
            expect(call.attributes.status).to.equal('AVAILABLE');
            expect(call.attributes.user_id).to.equal(null);
            done();
          });
    });
  });
});
