import usersService from '../db/services/users';
// import callVolunteer from '../util/twilio';
import campaignsService from '../db/services/campaigns';
import { callVolunteer, sayCallCompleted, sayHelloUser } from '../util/twilio';


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

export function startTwilioConnection(req, res) {
  const { id, campaign_id } = req.params;
  usersService.getUserById({ id })
    .then((volunteer) => {
      const { phone_number } = volunteer.attributes;
      callVolunteer(id, campaign_id, phone_number)
        .then((call) => {
          const { sid: call_sid } = call;
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
        })
        .catch(err => console.log(err));
    })
    .catch((err) => {
      res.status(500).json({ message: `Could not process request to get user by id: ${err}` });
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

// <<<<<<< HEAD
// export function printSID(req) {
//   console.log('the req in printSID is: ', req);
// =======
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
