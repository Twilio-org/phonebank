import { expect, Should } from 'chai';
import ContactList from '../../../server/db/services/contact_lists';
import Contact from '../../../server/db/services/contacts';

const should = Should();

describe('Contact List Service tests', () => {
  describe('insert/read/update', function() {
    before((done) => {
      this.params = {
        name: 'Millbrae Phone List'
      };
      this.params2 = {
        name: 'Mission Bay Phone List'
      };
      this.contact1 = {
        id: 1,
        first_name: 'Charlie',
        phone_number: '+1112223333'
      };
      done();
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

    it('should retrieve a contact list by id', (done) => {
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
    it('should retrieve an empty array when getting all contacts by id', (done) => {
      ContactList.getContactsInContactListById({ id: this.params.id })
        .then((contactsInContactList) => {
          expect(contactsInContactList.length).to.equal(0);
          done();
        })
        .catch((err) => {
          console.log('Error in calculating contacts in contact list:');
          done(err);
        });
    });
    it('should retrieve an array of one contact when getting all contacts by id', (done) => {
      Contact.saveNewContact(this.contact1)
        .then((newContact) => {
          const { id: contact_id } = newContact.attributes;
          ContactList.addContactToContactList({ contact_id, id: this.params.id })
            .then(() => {
              ContactList.getContactsInContactListById({ id: this.params.id })
                .then((contactsInContactList) => {
                  expect(contactsInContactList.length).to.equal(1);
                  done();
                })
                .catch((err) => {
                  console.log('Error in calculating contacts in contact list:');
                  done(err);
                });
            })
            .catch((err) => {
              console.log('Error in adding contact to contact list:\n\n');
              done(err);
            });
        })
        .catch((err) => {
          console.log(`Error in saving new contact: ${err}`);
        });
    });
  });
});
