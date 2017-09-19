import { expect } from 'chai';
import responsesService from '../../../server/db/services/responses';
import callsService from '../../../server/db/services/calls';
import campaignsService from '../../../server/db/services/campaigns';
import cleanUp from '../bootstrap';
import contactListsService from '../../../server/db/services/contact_lists';
import contactsService from '../../../server/db/services/contacts';
import scriptsService from '../../../server/db/services/scripts';
import usersService from '../../../server/db/services/users';
import questionsService from '../../../server/db/services/questions';

describe('Responses Service tests', () => {
  after((done) => {
    cleanUp(done);
  });

  describe('Save New Response', function() {
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

      this.responseParams = {
        response: 'Yes'
      };

      this.questionParams = {
        title: 'Sloths',
        description: 'Do you like sloths?',
        type: 'singleselect',
        responses: 'yes,no,sometimes'
      };

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
                        callsService.populateCall(this.callSaveParams)
                          .then((call) => {
                            this.responseParams.call_id = call.attributes.id;
                            questionsService.saveNewQuestion(this.questionParams)
                              .then((question) => {
                                this.responseParams.question_id = question.attributes.id;
                                done();
                              });
                          });
                      });
                    });
                });
            });
        });
    });


    it('should save a new response to with question_id 1 and call_id 4', (done) => {
      responsesService.saveNewResponse(this.responseParams)
        .then((response) => {
          expect(response.attributes.id).to.equal(1);
          expect(response.attributes.question_id).to.equal(this.responseParams.question_id);
          expect(response.attributes.call_id).to.equal(this.responseParams.call_id);
          expect(response.attributes.response).to.equal(this.responseParams.response);
          done();
        }, done);
    });

    it('should fetch responses with a specific question id: ', (done) => {
      // fetchResponsesByQuestionId
      // return responsesService.saveNewResponse(this.responseParams)
      //   .then((newResponse) => {
      //     if (newResponse) {
      const { question_id } = this.responseParams;
      return responsesService.fetchResponsesByQuestionId({ question_id })
      .then((responseModels) => {
        // should be only one response
        const { question_id: questionId, call_id, response } = responseModels[0].attributes;
        expect(response.attributes.id).to.equal(1);
        expect(response.attributes.question_id).to.equal(questionId);
        expect(response.attributes.call_id).to.equal(call_id);
        expect(response.attributes.response).to.equal(response);
        done();
      }, done)
      .catch(err => console.log(`error with fetchResponsesByQuestionId test: ${err}`));
        //   }
        // }, done)
        // .catch(err => console.log(`error saving new response in response tests: ${err}`));
    });
  });
});
