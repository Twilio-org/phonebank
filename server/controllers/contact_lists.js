import contactListsService from '../db/services/contact_lists';
import contactsService from '../db/services/contacts';

export function saveNewContactList(req, res, next) {
  const contactListParams = {
    name: req.body.name
  };
  const uploadedCsv = req.files.csv;
  console.log(uploadedCsv);

  function validateCSV() {
    return {
      attributes: {
        contacts: [
          {
            first_name: 'Sandy',
            last_name: 'Shoe',
            phone_number: '+11235678901',
            email: 'joe@shoe.com',
            external_id: 'test1234'
          },
          {
            first_name: 'Sam',
            last_name: 'Shoe',
            phone_number: '+11235678901',
            email: 'sally@shoe.com',
            external_id: 'test1235'
          },
          {
            first_name: 'Sally',
            last_name: 'Slipper',
            phone_number: '+1235671234',
            email: 'charlie@slipper.com',
            external_id: 'test1236'
          },
          {
            first_name: 'Frank',
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
                const { id: contact_id } = checkContact.attributes;
                const params = {
                  id: contact_id,
                  ...contact
                };
                contactsService.updateContactById(params)
                  .then(() => {
                    contactListsService.addContactToContactList({ contact_id, id })
                      .then(() => {
                        console.log('Successfully added contact to contact list after updating contact');
                      })
                      .catch((err) => {
                        console.log(`Error in adding contact to contact list after updating contact: ${err}`);
                      });
                  })
                  .catch((err) => {
                    console.log(`Error in updating contact: ${err}`);
                  });
              } else {
                contactsService.saveNewContact(contact)
                  .then((newContact) => {
                    const { id: contact_id } = newContact.attributes;
                    contactListsService.addContactToContactList({ contact_id, id });
                  })
                  .catch((err) => {
                    console.log(`Error in adding contact to contact list after adding contact: ${err}`);
                  });
              }
            })
            .catch((err) => {
              console.log(`Error in adding or updating contact: ${err}`);
            })
          );
      }
      res.status(201).json({ message: 'Contact List creation successful' });
      next();
    })
    .catch((err) => {
      console.log(err);
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
