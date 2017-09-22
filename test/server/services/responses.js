import { expect } from 'chai';
import responsesService from '../../../server/db/services/responses';
import callsService from '../../../server/db/services/calls';
import campaignsService from '../../../server/db/services/campaigns';
import contactListsService from '../../../server/db/services/contact_lists';
import contactsService from '../../../server/db/services/contacts';
import scriptsService from '../../../server/db/services/scripts';
import questionsService from '../../../server/db/services/questions';
import cleanUp from '../bootstrap';

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
                    Promise.all(this.callSaveParams.map((call, index) => {
                      return callsService.populateCall(call)
                        .then((populatedCall) => {
                          this.callSaveParams[index].id = populatedCall.attributes.id;
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

    it('should save a new response to with question_id 1 and call_id 4', (done) => {
      responsesService.saveNewResponse(this.responseParams[0])
        .then((response) => {
          this.responseParams[0].id = response.attributes.id;
          expect(response.attributes.id).to.equal(this.responseParams[0].id);
          expect(response.attributes.question_id).to.equal(this.responseParams[0].question_id);
          expect(response.attributes.call_id).to.equal(this.responseParams[0].call_id);
          expect(response.attributes.response).to.equal(this.responseParams[0].response);
          done();
        }, done);
    });

    it('should fetch responses with a specific question id and array of call_ids: ', (done) => {
      const [first, second, third] = this.responseParams;
      responsesService.saveNewResponse(second)
        .then((secondResponseModel) => {
          this.responseParams[1].id = secondResponseModel.attributes.id;
          responsesService.saveNewResponse(third)
            .then((thirdResponseModel) => {
              this.responseParams[2].id = thirdResponseModel.attributes.id;
              const { question_id } = this.responseParams[0];
              const callIdsArray = this.callSaveParams.map(call => call.id);
              const params = { question_id, calls_array: callIdsArray };
              responsesService.fetchResponsesByQuestionCallId(params)
              .then((responses) => {
                const { length, models: responseModels } = responses;
                const [firstRes, secondRes, thirdRes] = responseModels;
                const { question_id: questionIdOne,
                        call_id: callIdOne,
                        response: responseOne } = firstRes.attributes;
                const { question_id: questionIdTwo,
                        call_id: callIdTwo,
                        response: responseTwo } = secondRes.attributes;
                const { question_id: questionIdThree,
                        call_id: callIdThree,
                        response: responseThree } = thirdRes.attributes;
                const allHaveSameQuestionId = [questionIdOne, questionIdTwo, questionIdThree]
                  .reduce((accum, curr) => curr === question_id, true);
                expect(length).to.equal(this.callSaveParams.length);
                expect(allHaveSameQuestionId).to.equal(true);
                expect(responseOne).to.equal(first.response);
                expect(responseTwo).to.equal(second.response);
                expect(responseThree).to.equal(third.response);
                expect(callIdOne).to.equal(callIdsArray[0]);
                expect(callIdTwo).to.equal(callIdsArray[1]);
                expect(callIdThree).to.equal(callIdsArray[2]);
                done();
              }, done);
            }, done);
        }, done);
    });
  });
});
