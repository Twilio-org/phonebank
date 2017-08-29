import callsService from '../db/services/calls';
import usersService from '../db/services/users';

export function assignCall(req, res, next) {
  const user_id = req.params.id;

  usersService

  callsService.assignCall()
}
