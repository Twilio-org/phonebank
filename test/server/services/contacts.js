import { expect } from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Contact from '../../../server/db/services/contacts';

chai.use(chaiAsPromised);

describe('Contact service tests', function () {
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
        phone_number: '+15555555555'
      };
      this.contactSaveParams3 = {
        first_name: 'Sally',
        phone_number: '+15555555555'
      };
      this.contactSaveParams4 = {
        first_name: 'Sam',
        phone_number: '+15555555554'
      };
    });

    it('should save first contact\'s first name, last name, phone, email, and external_id', (done) => {
      const firstContact = this.contactSaveParams1;
      Contact.saveNewContact(firstContact)
        .then((contact) => {
          expect(contact.attributes.first_name).to.equal(firstContact.first_name);
          expect(contact.attributes.last_name).to.equal(firstContact.last_name);
          expect(contact.attributes.phone_number).to.equal(firstContact.phone_number);
          expect(contact.attributes.email).to.equal(firstContact.email);
          expect(contact.attributes.external_id).to.equal(firstContact.external_id);
          const contactProperties = Object.keys(contact.attributes);
          expect(contactProperties.length).to.equal(8);
        })
        .catch((err) => {
          console.log('Error with save first contact first, last, email and phone: ', err);
        });
      done();
    });
    it('should save second contact\'s first name and phone without violating repeat phone_number', (done) => {
      const secondContact = this.contactSaveParams2;
      Contact.saveNewContact(secondContact)
        .then((contact) => {
          expect(contact.attributes.first_name).to.equal(secondContact.first_name);
          expect(contact.attributes.phone_number).to.equal(secondContact.phone_number);
          const contactProperties = Object.keys(contact.attributes);
          expect(contactProperties.length).to.equal(8);
        })
        .catch((err) => {
          console.log('Error with save second contact first and phone: ', err);
        });
      done();
    });
    it('should not save third contact\'s first name and phone because it is violating unique constraint', (done) => {
      const thirdContact = this.contactSaveParams3;
      Contact.saveNewContact(thirdContact).should.be.rejected.notify(done);
    });
    it('should save the fourth contact without violating unique constraint (first name is the same as second contact)', (done) => {
      const fourthcontact = this.contactSaveParams4;
      Contact.saveNewContact(fourthcontact).should.not.be.rejected.notify(done);
    });
  });
  describe('Data retrieval', () => {
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
      Contact.getContactById({ id: 1 })
        .then((contact) => {
          expect(contact.attributes.first_name).to.equal(firstContact.first_name);
          expect(contact.attributes.last_name).to.equal(firstContact.last_name);
          expect(contact.attributes.email).to.equal(firstContact.email);
          expect(contact.attributes.phone).to.equal(firstContact.phone);
          expect(contact.attributes.external_id).to.equal(firstContact.external_id);
          expect(contact.attributes.is_invalid_number).to.equal(false);
          expect(contact.attributes.do_not_call).to.equal(false);
          done();
        })
        .catch((err) => {
          console.log('Error in retrieving first contact by id: ', err);
        });
    });
    it('should retrieve second contact\'s first name, phone, number status, and do not call status', (done) => {
      const secondContact = this.contactSaveParams2;
      Contact.getContactById({ id: 2 })
        .then((contact) => {
          expect(contact.attributes.first_name).to.equal(secondContact.first_name);
          expect(contact.attributes.phone).to.equal(secondContact.phone);
          expect(contact.attributes.is_invalid_number).to.equal(false);
          expect(contact.attributes.do_not_call).to.equal(false);
          done();
        })
        .catch((err) => {
          console.log('Error in retrieving second contact by id: ', err);
        });
    });
  });
  describe('Data update', () => {
    beforeEach(() => {
      this.contactUpdateParams1 = {
        id: 1,
        first_name: 'Sandra',
        do_not_call: true
      };
      this.contactUpdateParams2 = {
        id: 1,
        last_name: 'Stevens',
        is_invalid_number: true
      };
    });
    it('should update first contact\'s do not call status', (done) => {
      const firstContactUpdate = this.contactUpdateParams1;
      Contact.updateContactById(firstContactUpdate)
      .then((contact) => {
        expect(contact.attributes.first_name).to.equal(firstContactUpdate.first_name);
        expect(contact.attributes.do_not_call).to.equal(firstContactUpdate.do_not_call);
        done();
      })
      .catch((err) => {
        console.log('Error in updating first contact do not call by id: ', err);
      });
    });
    it('should update second contact\'s is_invalid_number status', (done) => {
      const secondContactUpdate = this.contactUpdateParams2;
      Contact.updateContactById(secondContactUpdate)
      .then((contact) => {
        expect(contact.attributes.last_name).to.equal(secondContactUpdate.last_name);
        expect(contact.attributes.is_invalid_number).to.equal(secondContactUpdate.is_invalid_number);
        done();
      })
      .catch((err) => {
        console.log('Error in updating second contact is_invalid_number by id: ', err);
      });
    });
  });
});
