import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
// import { expect, Should } from 'chai';
import * as chai from 'chai';
import { test as testconfig } from '../../../knexfile';
import Contact from '../../../server/db/services/contacts';
import Model from '../../../server/db/models/contacts';

const knex = knexModule(testconfig);
const bookshelf = bookshelfModule(knex);
const contactsModel = Model(bookshelf);
// const should = Should();
const expect = chai.expect;

describe('Contact service tests', function () {
  before((done) => {
    bookshelf.knex.schema.hasTable('contacts').then((exist) => {
      if (!exist) {
        bookshelf.knex.schema.createTable('contacts', (table) => {
          table.increments('id').primary();
          table.string('external_id').nullable();
          table.string('first_name').notNullable();
          table.string('last_name').nullable();
          table.string('email').nullable();
          table.string('phone_number').notNullable().unique().index();
          table.boolean('is_invalid_number').defaultTo(false);
          table.boolean('do_not_call').defaultTo(false);
          table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
          table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
        }).then(() => {
          console.log(('Created contacts table'));
          done();
        }).catch((err) => {
          console.log('Error creating contacts table', err);
        });
      }
    });
  });

  after(() =>
    bookshelf.knex.schema.dropTable('contacts')
      .then(() => {
        console.log('Dropped contacts table');
      })
      .catch((err) => {
        console.log('Error dropping contacts table: ', err);
      })
  );

  describe('Data insertion', function () {
    console.log('Now running contact service tests: ');
    beforeEach(() => {
      this.contactSaveParams1 = {
        first_name: 'Sally',
        last_name: 'Smith',
        phone_number: '+15555555555',
        email: 'sally@gmail.com',
        external_id: 'test1234'
      };
      this.contactSaveParams2 = {
        first_name: 'Sam',
        phone_number: '+15555555554'
      };
    });

    it('should be able to save first contact\'s first name, last name, phone, email, and external_id', (done) => {
      const firstContact = this.contactSaveParams1;
      Contact.saveNewContact(firstContact, contactsModel)
        .then((contact) => {
          expect(contact.attributes.first_name).to.equal(firstContact.first_name);
          expect(contact.attributes.last_name).to.equal(firstContact.last_name);
          expect(contact.attributes.phone_number).to.equal(firstContact.phone_number);
          expect(contact.attributes.email).to.equal(firstContact.email);
          expect(contact.attributes.external_id).to.equal(firstContact.external_id);
        })
        .catch((err) => {
          console.log('Error with save first contact first, last, email and phone: ', err);
        });
      done();
    });
    it('should be able to save second contact\'s first name and phone', (done) => {
      const secondContact = this.contactSaveParams2;
      Contact.saveNewContact(secondContact, contactsModel)
        .then((contact) => {
          expect(contact.attributes.first_name).to.equal(secondContact.first_name);
          expect(contact.attributes.phone_number).to.equal(secondContact.phone_number);
        })
        .catch((err) => {
          console.log('Error with save second contact first and phone: ', err);
        });
      done();
    });
    it('should only save 10 attributes to the first contact', (done) => {
      const firstContact = this.contactSaveParams1;
      Contact.saveNewContact(firstContact, contactsModel)
        .then((contact) => {
          const contactProperties = Object.keys(contact.attributes);
          expect(contactProperties.length).to.equal(10);
        })
        .catch((err) => {
          console.log('Error with number of attributes on first contact: ', err);
        });
      done();
    });
    it('should only save 7 attributes to the second contact', (done) => {
      const secondContact = this.contactSaveParams2;
      Contact.saveNewContact(secondContact, contactsModel)
        .then((contact) => {
          const contactProperties = Object.keys(contact.attributes);
          expect(contactProperties.length).to.equal(7);
        })
        .catch((err) => {
          console.log('Error with number of attributes on second contact: ', err);
        });
      done();
    });
  });
  describe('Data retrieval', function () {
    beforeEach(() => {
      this.contactSaveParams1 = {
        first_name: 'Sally',
        last_name: 'Smith',
        phone_number: '+15555555555',
        email: 'sally@gmail.com',
        external_id: 'test1234'
      };
      this.contactSaveParams2 = {
        first_name: 'Sam',
        phone_number: '+15555555554'
      };
    });
    it('should retrieve first contact\'s first name, last name, email, phone, external_id, number status, and do not call status', (done) => {
      const firstContact = this.contactSaveParams1;
      Contact.saveNewContact(firstContact, contactsModel)
        .then((contact) => {
          Contact.getContactById({ id: 1 }, contactsModel)
            .then((contact) => {
              expect(contact.attributes.first_name).to.equal(firstContact.first_name);
              expect(contact.attributes.last_name).to.equal(firstContact.last_name);
              expect(contact.attributes.email).to.equal(firstContact.email);
              expect(contact.attributes.phone).to.equal(firstContact.phone);
              expect(contact.attributes.external_id).to.equal(firstContact.external_id);
              expect(contact.attributes.is_invalid_number).to.equal(false);
              expect(contact.attributes.do_not_call).to.equal(false);
            })
            .catch((err) => {
              console.log('Error in retrieving first contact by id: ', err);
            });
          });
      done();
    });
    it('should retrieve second contact\'s first name, phone, number status, and do not call status', (done) => {
      const secondContact = this.contactSaveParams2;
      Contact.saveNewContact(secondContact, contactsModel)
        .then((contact) => {
          Contact.getContactById({ id: 2 }, contactsModel)
            .then((contact) => {
              expect(contact.attributes.first_name).to.equal(secondContact.first_name);
              expect(contact.attributes.phone).to.equal(secondContact.phone);
              expect(contact.attributes.is_invalid_number).to.equal(false);
              expect(contact.attributes.do_not_call).to.equal(false);
            })
            .catch((err) => {
              console.log('Error in retrieving second contact by id: ', err);
            });
          });
      done();
    });
  });
  describe('Data update', function () {
    beforeEach(() => {
      this.contactSaveParams1 = {
        first_name: 'Sally',
        last_name: 'Smith',
        phone_number: '+15555555555',
        email: 'sally@gmail.com',
        external_id: 'test1234'
      };
      this.contactSaveParams2 = {
        first_name: 'Sam',
        phone_number: '+15555555554'
      };
      this.contactUpdateParams1 = {
        id: 1,
        first_name: 'Sandra',
        do_not_call: true
      };
      this.contactUpdateParams2 = {
        id: 2,
        last_name: 'Stevens',
        is_invalid_number: true
      };
    });
    it('should update first contact\'s do not call status', (done) => {
      const firstContact = this.contactSaveParams1;
      const firstContactUpdate = this.contactUpdateParams1;
      Contact.saveNewContact(firstContact, contactsModel)
        .then((contact) => {
          Contact.updateContactById(firstContactUpdate, contactsModel)
          .then((contact) => {
            expect(contact.attributes.first_name).to.equal(firstContactUpdate.first_name);
            expect(contact.attributes.do_not_call).to.equal(firstContactUpdate.do_not_call);
          })
          .catch((err) => {
            console.log('Error in updating first contact do not call by id: ', err);
          });
        });
      done();
    });
    it('should update second contact\'s is_invalid_number status', (done) => {
      const secondContact = this.contactSaveParams2;
      const secondContactUpdate = this.contactUpdateParams2;
      Contact.saveNewContact(secondContact, contactsModel)
        .then((contact) => {
          Contact.updateContactById(secondContactUpdate, contactsModel)
          .then((contact) => {
            expect(contact.attributes.last_name).to.equal(secondContactUpdate.first_name);
            expect(contact.attributes.do_not_call).to.equal(secondContactUpdate.is_invalid_number);
          })
          .catch((err) => {
            console.log('Error in updating second contact is_invalid_number by id: ', err);
          });
        });
      done();
    });
  });
});
