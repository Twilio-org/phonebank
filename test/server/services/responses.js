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

      this.userSaveParams = {
        firstName: 'John',
        lastName: 'Doe',
        password: 'hatch',
        phoneNumber: '+14441114444',
        email: 'John@gmail.com'
      };

      this.callSaveParams = {};

      this.responseParams = [
        {
          response: 'Yes'
        },
        {
          response: 'No'
        },
        {
          response: 'Yes'
        }
      ];

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
                    usersService.saveNewUser(this.userSaveParams)
                      .then((user) => {
                        this.callSaveParams.user_id = user.attributes.id;
                        Promise.all(this.callSaveParams.map((call, index) => {
                          return callsService.populateCall(call)
                            .then((populatedCall) => {
                              this.responseParams[index].call_id = populatedCall.attributes.id;
                            });
                        }))
                          .then(() => {
                            questionsService.saveNewQuestion(this.questionParams)
                              .then((question) => {
                                this.responseParams.forEach((response) => {
                                  response.question_id = question.attributes.id;
                                });
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
      responsesService.saveNewResponse(this.responseParams[0])
        .then((response) => {
          this.responseParams[0].id = response.attributes.id;
          expect(response.attributes.id).to.equal(1);
          expect(response.attributes.question_id).to.equal(this.responseParams[0].question_id);
          expect(response.attributes.call_id).to.equal(this.responseParams[0].call_id);
          expect(response.attributes.response).to.equal(this.responseParams[0].response);
          done();
        }, done);
    });

    it('should fetch responses with a specific question id: ', (done) => {
      const [first, second, third] = this.responseParams;
      // return createTwoNewResponses(second, third, done)
      responsesService.saveNewResponse(second)
        .then((secondResponseModel) => {
          this.responseParams[1].id = secondResponseModel.attributes.id;
          responsesService.saveNewResponse(third)
            .then((thirdResponseModel) => {
              this.responseParams[2].id = thirdResponseModel.attributes.id;
              const { question_id } = this.responseParams[0];
              responsesService.fetchResponsesByQuestionId({ question_id })
              .then((responses) => {
                const { length, models: responseModels } = responses;
                const [firstResponse, secondResponse, thirdResponse] = responseModels;
                const { id: idOne,
                        question_id: questionIdOne,
                        call_id: callIdOne,
                        response: responseOne } = firstResponse.attributes;
                const { id: idTwo,
                        question_id: questionIdTwo,
                        call_id: callIdTwo,
                        response: responseTwo } = secondResponse.attributes;
                const { id: idThree,
                        question_id: questionIdThree,
                        call_id: callIdThree,
                        response: responseThree } = thirdResponse.attributes;
                expect(length).to.equal(this.responseParams.length);
                expect(idOne).to.equal(this.responseParams[0].id);
                expect(questionIdOne).to.equal(first.question_id);
                expect(callIdOne).to.equal(first.call_id);
                expect(responseOne).to.equal(first.response);
                expect(idTwo).to.equal(second.id);
                expect(questionIdTwo).to.equal(question_id);
                expect(callIdTwo).to.equal(second.call_id);
                expect(responseTwo).to.equal(second.response);
                expect(idThree).to.equal(third.id);
                expect(questionIdThree).to.equal(question_id);
                expect(callIdThree).to.equal(third.call_id);
                expect(responseThree).to.equal(third.response);
                expect(questionIdOne).to.equal(questionIdThree);
                expect(questionIdTwo).to.equal(questionIdThree);
                done();
              }, done);
            }, done);
        }, done);
    });
  });
});
