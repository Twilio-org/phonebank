import faker from 'faker';
import campaignsService from '../db/services/campaigns';
import contactListsService from '../db/services/contact_lists';
import contactsService from '../db/services/contacts';
import questionsService from '../db/services/questions';
import scriptsService from '../db/services/scripts';
import User from './models/users';

function getRandomFourDigitInt() {
  const floor = Math.ceil(1000);
  const ceiling = Math.floor(10000);
  return Math.floor(Math.random() * (ceiling - floor)) + floor;
}

const firstName1 = faker.name.firstName();
const firstName2 = faker.name.firstName();
const lastName1 = faker.name.lastName();
const lastName2 = faker.name.lastName();
const email1 = `${firstName1}.${lastName1}@notrealemail.com`;
const email2 = `${firstName2}.${lastName2}@notrealemail.com`;
const password = 'password';
const userParams = [
  {
    first_name: firstName1,
    last_name: lastName1,
    email: email1,
    phone_number: `555-555-${getRandomFourDigitInt()}`,
    password_hash: password,
    is_admin: true
  },
  {
    first_name: firstName2,
    last_name: lastName2,
    email: email2,
    phone_number: `555-555-${getRandomFourDigitInt()}`,
    password_hash: password,
    is_admin: true
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
const fullContactFirstName = faker.name.firstName();
const fullContactLastName = faker.name.lastName();
const fullContactEmail = `${fullContactFirstName}.${fullContactLastName}@notrealemail.com`;
const contactParams = [
  {
    first_name: faker.name.firstName(),
    phone_number: `555-555-${getRandomFourDigitInt()}`
  },
  {
    first_name: faker.name.firstName(),
    phone_number: `555-555-${getRandomFourDigitInt()}`
  },
  {
    first_name: faker.name.firstName(),
    phone_number: `555-555-${getRandomFourDigitInt()}`
  },
  {
    first_name: fullContactFirstName,
    last_name: fullContactLastName,
    phone_number: `555-555-${getRandomFourDigitInt()}`,
    email: fullContactEmail,
    external_id: 'external_id'
  }
];
const contactListParams = {
  name: 'Contact List 1'
};
let campaignScriptId;

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

function generatePromiseActions(paramsArray, createFunction) {
  const callArray = [];

  paramsArray.forEach((paramsObject, index) => {
    callArray.push(createFunction(paramsArray[index]));
  });

  return callArray;
}

Promise.all(generatePromiseActions(userParams, createUser));
Promise.all(generatePromiseActions(questionParams, createQuestion))
  .then((questions) => {
    scriptsService.saveNewScript(scriptParams)
      .then((script) => {
        campaignScriptId = script.attributes.id;
        // console.log(questions);
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
          .then().catch(err => console.log(err));
      }).catch(err => console.log(err));
  }).catch(err => console.log(err));

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
        });

        Promise.all(generatePromiseActions(contactListContactParams, createContactListContact))
          .then(() => {
            const campaignParams = {
              name: 'Campaign 1',
              title: 'Campaign 1 Title',
              description: 'Campaign 1 description',
              status: 'active',
              contact_lists_id: contactList.attributes.id,
              script_id: campaignScriptId
            };

            campaignsService.saveNewCampaign(campaignParams).then().catch(err => console.log(err));
          }).catch(err => console.log(err));
      }).catch(err => console.log(err));
  }).catch(err => console.log(err));
