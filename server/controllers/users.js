import usersService from '../db/services/users';

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
        res.status(200).json(users);
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
  if (key) {
    const newParamObj = paramObj;
    newParamObj[toCamelCase(key)] = JSON.parse(status);
  }
}

export function manageUserById(req, res, next) {
  if (req.body.isBanned === 'true') {
    req.body.isActive = 'false';
  }

  const params = {
    id: req.params.id
  };
  //  This is necessary because params keys are camel cased and the req.body is coming in as snake
  Object.keys(req.body).forEach((key) => {
    addIfExists(params, key, req.body[key]);
  });

  if (params.isActive && params.isBanned) {
    return res.status(400).json({ message: 'A banned user cannot be activated' });
  }
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

