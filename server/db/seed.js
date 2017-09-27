import faker from 'faker';
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
    first_name: 'Jadzia',
    last_name: 'Thomas',
    email: 'jadzia@twilio.com',
    phone_number: '+14237712171',
    password_hash: password
  }
];

function createUser(params) {
  return new User(params).save().then().catch(err => console.log(err));
}

function generatePromiseActions(paramsArray, createFunction) {
  const callArray = [];

  paramsArray.forEach((paramsObject, index) => {
    callArray.push(createFunction(paramsArray[index]));
  });

  return callArray;
}

Promise.all(generatePromiseActions(userParams, createUser))
  .then().catch(err => console.log(err));
