import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import { expect, Should } from 'chai';
import { test as testconfig } from '../../../knexfile';
import ContactList from '../../../server/db/services/contact_lists';
import Model from '../../../server/db/models/contact_lists';

const knex = knexModule(testconfig);
const bookshelf = bookshelfModule(knex);
const contactListsModel = Model(bookshelf);
const should = Should();

describe('Contact List Service tests', () => {
  before((done) => {
    bookshelf.knex.schema.hasTable('contact_lists').then((exist) => {
      if (!exist) {
        bookshelf.knex.schema.createTable('contact_lists', (table) => {
          table.increments('id').primary();
          table.string('name').notNullable().unique();
          table.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
          table.timestamp('updated_at').defaultTo(bookshelf.knex.fn.now());
        }).then(() => {
          console.log(('** created contact_lists table'));
          done();
        }).catch((err) => {
          console.log('! error creating contacts_lists table', err);
        });
      }
    });
  });
  after(() =>
    bookshelf.knex.schema.dropTable('contact_lists')
      .then(() => {
        console.log('* dropped contact_lists table');
      })
      .catch((err) => {
        console.log('! error dropping contact_lists table', err);
      })
  );

  describe('Data insertion', function() {
    beforeEach(() => {
      this.params = {
        name: 'Millbrae Phone List'
      };
      this.params2 = {
        name: 'Mission Bay Phone List'
      };
    });

    it('should create contact list and save all parameters', (done) => {
      ContactList.saveNewContactList(this.params, contactListsModel)
        .then((contactList) => {
          expect(contactList.attributes.name).to.equal(this.params.name);
          done();
        }).catch((err) => {
          console.log('error with saving contact list test', err);
        });
    });
  });
  describe('Data update', function() {
    beforeEach(() => {
      this.params = {
        name: 'San Francisco Mission Phone List'
      };
    });

    it('should update a contact list name', (done) => {
      ContactList.saveNewContactList(this.params, contactListsModel)
        .then((contactList) => {
          const newParams = { id: contactList.id, name: 'New Name' };
          ContactList.updateContactListById(newParams, contactListsModel)
            .then((updatedContactList) => {
              expect(updatedContactList.attributes.name).to.equal(newParams.name);
            })
            .catch((err) => {
              console.log('error with updating contact list \n\n');
              done(err);
            });
          done();
        })
        .catch((err) => {
            console.log('error with saving contact list before updating \n\n');
            done(err);
        });
    });
  });

  describe('Data retrieval', function() {
    beforeEach(() => {
      this.params = {
        id: 1
      };
    });
    it('should retrieva a contact list by name', (done) => {
      ContactList.getContactListById(this.params, contactListsModel)
        .then((contactList) => {
          expect(contactList.attributes.id).to.equal(1);
          done();
        })
        .catch((err) => {
            console.log('error with getting contact list \n\n');
            done(err);
        });
    });
    it('should retrieve all contact lists', (done) => {
      ContactList.getAllContactLists(contactListsModel)
        .then((contactLists) => {
          expect(contactLists.length).to.equal(2);
          done();
        })
        .catch((err) => {
          console.log('error with getting contact lists \n\n');
          done(err);
        });
    });
  });

});
