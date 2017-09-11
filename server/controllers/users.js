import usersService from '../db/services/users';
import campaignsService from '../db/services/campaigns';
import contactsService from '../db/services/contacts';
import callsService from '../db/services/calls';
import { sayCallCompleted, sayHelloUser } from '../util/twilio';
import { sayDialingContact } from '../util/ao_twilio';

function cleanUserObject(user) {
  const cleanUser = user;
  delete cleanUser.attributes.password_hash;
  return cleanUser;
}

export function getUserByEmail(req, res, next) {
  const params = {
    email: req.body.email
  };

  return usersService.getUserByEmail(params)
    .then((user) => {
      if (user) {
        const userObject = cleanUserObject(user);
        res.status(200).json(userObject);
      }
      next();
    }).catch((err) => {
      console.log('could not add user ', err);
    });
}

export function getUserById(req, res, next) {
  const params = {
    id: req.params.id
  };

  return usersService.getUserById(params)
    .then((user) => {
      if (user) {
        const userObject = cleanUserObject(user);
        res.status(200).json(userObject);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not fetch user by id: ', err);
    });
}

export function updateUserById(req, res, next) {
  const params = {
    id: req.params.id,
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    password: req.body.password,
    phoneNumber: req.body.phone_number,
    email: req.body.email
  };

  return usersService.updateUserById(params)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not update user: ', err);
    });
}

export function deactivateUserById(req, res, next) {
  const params = {
    id: req.params.id
  };

  return usersService.deactivateUserById(params)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not deactivateUser', err);
    });
}

export function getAllUsers(req, res, next) {
  return usersService.getAllUsers()
    .then((users) => {
      if (users) {
        const cleanedUsers = users.map(user => cleanUserObject(user));
        res.status(200).json(cleanedUsers);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not retrieve users', err);
    });
}

function toCamelCase(word) {
  const wordArr = word.split('_').join('');
  const camelized = wordArr.slice(0, 2) + wordArr[2].toUpperCase() + wordArr.slice(3);
  return camelized;
}

function addIfExists(paramObj, key, status) {
  const newParamObj = paramObj;
  newParamObj[toCamelCase(key)] = JSON.parse(status);
}

export function manageUserById(req, res, next) {
  if (req.body.is_banned === 'true') {
    req.body.is_active = 'false';
  }

  const params = {
    id: req.params.id
  };
  Object.keys(req.body).forEach((key) => {
    addIfExists(params, key, req.body[key]);
  });

  return usersService.updateUserById(params)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not update user: ', err);
    });
}

export function addCampaignToUser(req, res, next) {
  const params = {
    id: req.params.id,
    campaign_id: req.body.campaign_id
  };
  return usersService.addCampaignToUser(params)
    .then((campaign) => {
      if (campaign) {
        res.status(201).json(campaign);
      } else {
        next();
      }
    })
    .catch((err) => {
      if (err.code === '23505') {
        res.status(400).json({ message: 'This campaign_id and user_id combination already exists' });
      } else if (err.code === '23503') {
        res.status(400).json({ message: 'This campaign_id doesn\'t exists or is invalid' });
      } else {
        res.status(400).json({ message: 'Cannot add campaign to user' });
      }
    });
}

export function getUserCampaigns(req, res, next) {
  const params = { id: req.params.id };

  return usersService.getUserCampaigns(params)
    .then((campaigns) => {
      if (campaigns) {
        res.status(200).json(campaigns);
      } else {
        next();
      }
    })
    .catch(err => console.log('could not retrieve user\'s campaigns:', err));
}

export function getUserCampaignAssociation(req, res) {
  const { id, campaign_id } = req.params;
  const params = { id, campaign_id };
  return usersService.getUserCampaignAssociation(params)
    .then((campaign) => {
      if (campaign !== null) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(404).json({ message: `Cannot process request for campaign_user association: ${err}` });
    });
}

export function updateUserCallSIDField(req, res) {
  const { id } = req.params;
  const call_sid = 'CAdksl234591adfide294821kdau3u3933';
  const params = { id, call_sid };
  return usersService.updateUserById(params)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Could not process request to update user Call SID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `Could not process request to update user Call SID: ${err}` });
    });
}

export function clearUserCallSIDField(req, res) {
  const { id } = req.params;
  return usersService.clearUserCallSID({ id })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Could not process request to clear user Call SID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `Could not process request to clear user Call SID: ${err}` });
    });
}

export function getCallStartTwiml(req, res) {
  const user_id = parseInt(req.params.id, 10);
  const campaign_id = parseInt(req.params.campaign_id, 10);

  return usersService.getUserById({ id: user_id })
    .then((user) => {
      if (user) {
        const userFirstName = user.attributes.first_name;
        return campaignsService.getCampaignById({ id: campaign_id })
          .then((campaign) => {
            if (campaign) {
              const campaignName = campaign.attributes.name;
              const helloUserTwiml = sayHelloUser(userFirstName, campaignName);
              return res.status(200)
                .set({ 'Content-Type': 'text/xml' })
                .send(helloUserTwiml);
            }
            return res.status(404).json({ message: `Could not find campaign with id ${campaign_id}` });
          }).catch(err => console.log('error fetching campaign by id in getCallStartTwiml user controller function: ', err));
      }
      return res.status(404).json({ message: `Could not find user with id ${user_id}` });
    }).catch(err => console.log('error fetching user by id in getCallStartTwiml user controller function: ', err));
}

export function volunteerCallback(req, res) {
  const { id } = req.params;
  return usersService.clearUserCallSID({ id })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Could not find user with id on volunteer callback' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `Could not process request to clear user Call SID on volunteer callback: ${err}` });
    });
}

export function getCallCompleteTwiml(req, res) {
  const callCompletedTwiml = sayCallCompleted();
  return res.status(200)
    .set({ 'Content-Type': 'text/xml' })
    .send(callCompletedTwiml);
}

function getContactIdIfNotExist(callId, contactId) {
  return new Promise((resolve, reject) => {
    if (!contactId) {
      callsService.getCallById({ id: callId })
      .then((call) => {
        const { contact_id } = call;
        resolve({ contact_id });
      })
      .catch(err => reject(err));
    } else {
      resolve({ contact_id: contactId });
    }
  });
}

export function connectVolunteerToContact(req, res) {
  // NOTE: could also contact id from the from the fe in the body....
  // need to look up contact id => contact name
  const user_id = parseInt(req.params.usser_id, 10);
  const campaign_id = parseInt(req.params.campaign_id, 10);
  const call_id = parseInt(req.params.call_id, 10);
  const { contact_id: contactId } = req.body;

  return getContactIdIfNotExist(call_id, contactId)
  .then((contact) => {
    let { contact_id } = contact;
    if (typeof contact_id !== 'number') {
      contact_id = parseInt(contact_id, 10);
    }
    return contactsService.getContactById({ id: contact_id })
      .then((contactObj) => {
        if (contactObj) {
          const { phone_number, first_name, last_name } = contactObj;
          const name = last_name ? `${first_name} ${last_name}` : first_name;
          const nowCallingTwiml = sayDialingContact(name, phone_number, user_id, campaign_id);
          return res.status(200)
            .set({ 'Content-Type': 'text/xml' })
            .send(nowCallingTwiml);
        }
        return res.status(404).json({ message: `Could not find contact id: ${contact_id}` });
      })
      .catch((err) => {
        res.status(500).json({ message: `Could not process request to connect volunteer to contact id: ${contact_id}:  ${err}` });
      });
  });
}
