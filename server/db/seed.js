import faker from 'faker';
import db from './db';
import campaignsService from '../db/services/campaigns';
import callsService from '../db/services/calls';
import contactListsService from '../db/services/contact_lists';
import contactsService from '../db/services/contacts';
import questionsService from '../db/services/questions';
import scriptsService from '../db/services/scripts';
import usersService from '../db/services/users';
import User from './models/users';

function getRandomFourDigitInt() {
  return Math.floor(Math.random() * (10000 - 1000)) + 1000;
}

const password = 'password';
const userParams = [
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.firstName(),
    email: 'admin@foobar.com',
    phone_number: `555-555-${getRandomFourDigitInt()}`,
    password_hash: password,
    is_admin: true
  },
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.firstName(),
    email: 'user@foobar.com',
    phone_number: `555-555-${getRandomFourDigitInt()}`,
    password_hash: password
  }
];
const questionParams = [
  {
    title: 'Question 1',
    description: 'test question 1',
    type: 'singleselect',
    responses: 'resp1,resp2,resp3,resp4,resp5'
  },
  {
    title: 'Question 2',
    description: 'test question 2',
    type: 'paragraph',
    responses: ''
  },
  {
    title: 'Question 3',
    description: 'test question 3',
    type: 'multiselect',
    responses: 'resp1,resp2,resp3,resp4,resp5'
  }
];
const scriptParams = {
  name: 'Script 1',
  description: 'This is the first script.',
  body: 'Script 1 body'
};

const contactParams = new Array(50).fill(null).map(() => {
  const phone_number = `555-555-${getRandomFourDigitInt()}`;
  const first_name = faker.name.firstName();
  return {
    first_name,
    phone_number
  };
});

const fullContactFirstName = faker.name.firstName();
const fullContactLastName = faker.name.lastName();
const fullContactEmail = `${fullContactFirstName}.${fullContactLastName}@notrealemail.com`;

contactParams.push({
  first_name: fullContactFirstName,
  last_name: fullContactLastName,
  phone_number: `555-555-${getRandomFourDigitInt()}`,
  email: fullContactEmail,
  external_id: 'external_id'
});

const contactListParams = {
  name: 'Contact List 1'
};
let campaignScriptId;

const callParams = [];

function createUser(params) {
  return new User(params).save()
  .then().catch(err => console.log(err));
}

function createQuestion(params) {
  return questionsService.saveNewQuestion(params)
    .then().catch(err => console.log(err));
}

function createScriptQuestion(params) {
  return scriptsService.addQuestionToScript(params)
    .then().catch(err => console.log(err));
}

function createContact(params) {
  return contactsService.saveNewContact(params)
    .then().catch(err => console.log(err));
}

function createContactListContact(params) {
  return contactListsService.addContactToContactList(params)
  .then().catch(err => console.log(err));
}

function createCall(params) {
  return callsService.populateCall(params)
  .then().catch(err => console.log(err));
}

function generatePromiseActions(paramsArray, createFunction) {
  const callArray = [];

  paramsArray.forEach((paramsObject, index) => {
    callArray.push(createFunction(paramsArray[index]));
  });

  return callArray;
}

Promise.all(generatePromiseActions(userParams, createUser))
  .then((users) => {
    Promise.all(generatePromiseActions(questionParams, createQuestion))
      .then((questions) => {
        scriptsService.saveNewScript(scriptParams)
          .then((script) => {
            campaignScriptId = script.attributes.id;
            const id = campaignScriptId;
            const questionIds = questions.map(question => question.attributes.id);
            const scriptQuestionParams = [];
            questionIds.forEach((questionId, index) => {
              scriptQuestionParams.push({
                id,
                question_id: questionId,
                sequence_number: index + 1
              });
            });

            Promise.all(generatePromiseActions(scriptQuestionParams, createScriptQuestion))
              .then(() => {
                contactListsService.saveNewContactList(contactListParams)
                  .then((contactList) => {
                    Promise.all(generatePromiseActions(contactParams, createContact))
                      .then((contacts) => {
                        const contactIds = contacts.map(contact => contact.attributes.id);
                        const contactListContactParams = [];

                        contactIds.forEach((contactId) => {
                          contactListContactParams.push({
                            id: contactList.attributes.id,
                            contact_id: contactId
                          });
                          callParams.push({ contact_id: contactId });
                        });

                        Promise.all(generatePromiseActions(contactListContactParams,
                                                           createContactListContact))
                          .then(() => {
                            const campaignParams = {
                              name: 'Campaign 1',
                              title: 'Campaign 1 Title',
                              description: 'Campaign 1 description',
                              status: 'active',
                              contact_lists_id: contactList.attributes.id,
                              script_id: campaignScriptId
                            };

                            campaignsService.saveNewCampaign(campaignParams)
                              .then((campaign) => {
                                const campaignId = campaign.attributes.id;
                                const userId = users.map(user => user.attributes.id)[1];
                                const cloneCallParams = callParams.map(call =>
                                  Object.assign({}, call, { campaign_id: campaignId }));

                                Promise.all(generatePromiseActions(cloneCallParams, createCall))
                                  .then(() => {
                                    usersService.addCampaignToUser({
                                      campaign_id: campaignId,
                                      id: userId
                                    }).then(() => {
                                      db.knex.destroy(() => console.log('All Entries created.'));
                                    }).catch(err => console.log(err));
                                  }).catch(err => console.log(err));
                              }).catch(err => console.log(err));
                          }).catch(err => console.log(err));
                      }).catch(err => console.log(err));
                  }).catch(err => console.log(err));
              }).catch(err => console.log(err));
          }).catch(err => console.log(err));
      }).catch(err => console.log(err));
  });
