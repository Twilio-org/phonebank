import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import contactListsService from '../db/services/contact_lists';
import { development as devconfig } from '../../knexfile';
import ContactList from '../db/models/contact_lists';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
const ContactListsModel = ContactList(bookshelf);

export function saveNewContactList(req, res, next) {
  const contactListParams = {
    name: req.body.name
  };

  return contactListsService.saveNewContactList(contactListParams, ContactListsModel)
    .then((contactList) => {
      if (contactList) {
        res.status(201).json({ message: 'Contact List creation successful' });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ message: 'Contact List creation unsuccessful' });
    });
}

export function addContactToContactList(req, res, next) {
  const params = {
    id: req.params.id,
    contact_id: req.params.contact_id
  };

  return contactListsService.addContactToContactList(params, ContactListsModel)
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

export function getContactsInContactListById(req, res, next) {
  const params = {
    id: req.params.id
  };
  return contactListsService.getContactsInContactListById(params, ContactListsModel)
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

  return contactListsService.getContactListById(params, ContactListsModel)
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

  return contactListsService.getContactListByName(params, ContactListsModel)
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
  return contactListsService.updateContactListById(params, ContactListsModel)
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
