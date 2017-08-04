import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import contactsService from '../db/services/contacts';
import { development as devconfig } from '../../knexfile';
import Contact from '../db/models/contacts';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
const ContactsModel = Contact(bookshelf);

export function saveNewContact(req, res, next) {
  const contactParams = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.last_name,
    phone_number: req.body.phone_number,
    external_id: req.body.external_id
  };

  return contactsService.saveNewContact(contactParams, ContactsModel)
    .then((contact) => {
      if (contact) {
        res.status(201).json({ message: 'Contact creation successful' });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ message: 'Contact creation unsuccessful' });
    });
}

export function getContactById(req, res, next) {
  const params = {
    id: req.params.id
  };

  return contactsService.getContactByExternalId(params, ContactsModel)
    .then((contact) => {
      if (contact) {
        res.status(200).json(contact);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not fetch contact by id: ', err);
    });
}

export function getContactByExternalId(req, res, next) {
  const params = {
    external_id: req.body.external_id
  };

  return contactsService.getContactByExternalId(params, ContactsModel)
    .then((contact) => {
      if (contact) {
        res.status(200).json(contact);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not fetch contact by external id: ', err);
    });
}

export function getContactByPhoneNumber(req, res, next) {
  const params = {
    phone_number: req.body.phone_number
  };

  return contactsService.getContactByPhoneNumber(params, ContactsModel)
    .then((contact) => {
      if (contact) {
        res.status(200).json(contact);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not fetch contact by phone number: ', err);
    });
}

export function updateContactById(req, res, next) {
  const params = {
    id: req.params.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    external_id: req.body.external_id,
    do_not_call: req.body.do_not_call,
    is_invalid_number: req.body.is_invalid_number
  };
  return contactsService.updateContactById(params, ContactsModel)
    .then((contact) => {
      if (contact) {
        res.status(200).json(contact);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not update contact: ', err);
    });
}

export function updateContactDoNotCallById(req, res, next) {
  const params = {
    id: req.params.id,
    do_not_call: true
  };
  return contactsService.updateContactById(params, ContactsModel)
    .then((contact) => {
      if (contact) {
        res.status(200).json(contact);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not update contact do not call status: ', err);
    });
}

export function updateContactInvalidNumberById(req, res, next) {
  const params = {
    id: req.params.id,
    is_invalid_number: true
  };
  return contactsService.updateContactById(params, ContactsModel)
    .then((contact) => {
      if (contact) {
        res.status(200).json(contact);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not update contact invalid number status: ', err);
    });
}
