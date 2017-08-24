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

export function manageUserById(req, res, next) {
  const params = {
    id: req.params.id,
    isAdmin: req.body.is_admin,
    isActive: req.body.is_active,
    isBanned: req.body.is_banned
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

