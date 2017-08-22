import contactListsService from '../db/services/contact_lists';
import contactsService from '../db/services/contacts';


export function saveNewContactList(req, res, next) {
  const contactListParams = {
    name: req.body.name
  };

  const uploadedCsv = req.files.csv;

  console.log(uploadedCsv);

  return contactListsService.saveNewContactList(contactListParams)
    .then((contactList) => {
      if (contactList) {
        const { id } = contactList.attributes;
        contactList.forEach(contact =>
          contactsService.getContactByPhoneNumberAndFirstName(contact)
            .then((checkContact) => {
              if (checkContact) {
                const { id: checkContactId } = checkContact.attributes;
                const params = {
                  id: checkContactId,
                  ...contact
                };
                contactsService.updateContactById(params)
                  .then((updatedContact) => {
                    const { id: contact_id } = updatedContact;
                    contactListsService.addContactToContactList({ id, contact_id });
                  })
                  .catch((err) => {
                    console.log(`Error in adding contact to contact list after updating contact: ${err}`);
                  });
              } else {
                contactsService.saveNewContact(contact)
                  .then((newContact) => {
                    const { id: contact_id } = newContact.attributes;
                    contactListsService.addContactToContactList({ id, contact_id });
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
