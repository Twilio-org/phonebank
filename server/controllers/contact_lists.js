import contactListsService from '../db/services/contact_lists';
import contactsService from '../db/services/contacts';

export function saveNewContactList(req, res, next) {
  const contactListParams = {
    name: req.body.name
  };
  // const uploadedCsv = req.files.csv;
  // console.log(uploadedCsv);

  function validateCSV() {
    return {
      attributes: {
        contacts: [
          {
            first_name: 'J',
            last_name: 'Shoe',
            phone_number: '+11235678901',
            email: 'joe@shoe.com',
            external_id: 'test1234'
          },
          {
            first_name: 'S',
            last_name: 'Shoe',
            phone_number: '+11235678901',
            email: 'sally@shoe.com',
            external_id: 'test1235'
          },
          {
            first_name: 'J',
            last_name: 'Slipper',
            phone_number: '+1235671234',
            email: 'charlie@slipper.com',
            external_id: 'test1236'
          },
          {
            first_name: 'F',
            last_name: 'Flipflop',
            phone_number: '+1123561234',
            email: 'frank@flipflop.com',
            external_id: 'test1237'
          }
        ]
      }
    };
  }

  try {
    // validateCSV(uploadedCsv);
  } catch (error) {
    console.log(`Error in validating CSV: ${error}`);
  }

  const testContactListParams = validateCSV();
  let contactPromise;
  // let contact_id;
  return contactListsService.saveNewContactList(contactListParams)
    .then((contactList) => {
      if (contactList) {
        const { id } = contactList.attributes;
        // FOR TESTING:
        const { contacts } = testContactListParams.attributes;
        contacts.forEach(contact =>
          contactsService.getContactByPhoneNumberAndFirstName(contact)
            .then((checkContact) => {
              if (checkContact) {
                const contact_id = checkContact.attributes.id;
                const params = {
                  id: contact_id,
                  ...contact
                };
                contactPromise = contactsService.updateContactById(params);
              } else {
                contactPromise = contactsService.saveNewContact(contact);
              }
              contactPromise
                .then((newOrUpdatedContact) => {
                  const { id: newOrUpdatedContactId } = newOrUpdatedContact.attributes;
                  contactListsService.addContactToContactList({
                    contact_id: newOrUpdatedContactId,
                    id
                  })
                    .then(() => {
                      console.log('Successfully added contact to contact list');
                    })
                    .catch((err) => {
                      console.log(`Error in adding contact to contact list: ${err}`);
                    });
                })
                .catch((err) => {
                  console.log(`Error in adding or updating contact: ${err}`);
                });
            })
            .catch((err) => {
              console.log(`Error in getting contact by first name and phone number: ${err}`);
            })
          );
        res.status(201).json({ message: 'Contact List creation successful' });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(`The error at the end of the saveNewContactList controller is: ${err}`);
      res.status(401).json({ message: 'Contact List creation unsuccessful' });
    });
}

export function addContactToContactList(req, res, next) {
  const params = {
    id: req.params.id,
    contact_id: req.body.contact_id
  };

  return contactListsService.addContactToContactList(params)
    .then((contactList) => {
      if (contactList) {
        res.status(201).json({ message: 'Contact added to Contact List successfully' });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ message: 'Contact added to Contact List unsuccessful' });
    });
}

export function getAllContactLists(req, res, next) {
  return contactListsService.getAllContactLists()
    .then((contactLists) => {
      if (contactLists) {
        res.status(200).json(contactLists);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not get all contact lists: ', err);
    });
}

export function getContactsInContactListById(req, res, next) {
  const params = {
    id: req.params.id
  };
  return contactListsService.getContactsInContactListById(params)
    .then((contactList) => {
      if (contactList) {
        res.status(200).json(contactList);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not get contacts in contact list by id: ', err);
    });
}

export function getContactListById(req, res, next) {
  const params = {
    id: req.params.id
  };

  return contactListsService.getContactListById(params)
    .then((contactList) => {
      if (contactList) {
        res.status(200).json(contactList);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not fetch contact list by id: ', err);
    });
}

export function getContactListByName(req, res, next) {
  const params = {
    name: req.body.name
  };

  return contactListsService.getContactListByName(params)
    .then((contactList) => {
      if (contactList) {
        res.status(200).json(contactList);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not fetch contact list by name: ', err);
    });
}

export function updateContactListById(req, res, next) {
  const params = {
    id: req.params.id,
    name: req.body.name
  };
  return contactListsService.updateContactListById(params)
    .then((contactList) => {
      if (contactList) {
        res.status(200).json(contactList);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not update contact list: ', err);
    });
}
