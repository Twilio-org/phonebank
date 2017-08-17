import { expect, Should } from 'chai';
import ContactList from '../../../server/db/services/contact_lists';

const should = Should();

describe('Contact List Service tests', () => {
  describe('insert/read/update', function() {
    before(() => {
      this.params = {
        name: 'Millbrae Phone List'
      };
      this.params2 = {
        name: 'Mission Bay Phone List'
      };
    });

    it('should create contact list and save all parameters', (done) => {
      ContactList.saveNewContactList(this.params)
        .then((contactList) => {
          this.params.id = contactList.attributes.id;
          expect(contactList.attributes.name).to.equal(this.params.name);
          done();
        }).catch((err) => {
          console.log('error with saving contact list test', err);
        });
    });

    it('should update a contact list name', (done) => {
      ContactList.saveNewContactList(this.params2)
        .then((contactList) => {
          const newParams = { id: contactList.id, name: 'New Name' };
          this.params2.id = contactList.id;
          ContactList.updateContactListById(newParams)
            .then((updatedContactList) => {
              expect(updatedContactList.attributes.name).to.equal(newParams.name);
              this.params2.name = newParams.name;
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

    it('should retrieva a contact list by id', (done) => {
      const queryParams = { id: this.params2.id };
      ContactList.getContactListById(queryParams)
        .then((contactList) => {
          expect(contactList.attributes.id).to.equal(this.params2.id);
          expect(contactList.attributes.name).to.equal(this.params2.name);
          done();
        })
        .catch((err) => {
            console.log('error with getting contact list \n\n');
            done(err);
        });
    });

    it('should retrieve all contact lists', (done) => {
      ContactList.getAllContactLists()
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
