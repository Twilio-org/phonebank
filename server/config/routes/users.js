import express from 'express';
import { getUserById,
         updateUserById,
         deactivateUserById } from '../../controllers/users';

const router = express.Router();

router.route('/:id').get(getUserById);
router.route('/:id').put(updateUserById);
router.route('/:id').patch(deactivateUserById);

export default router;
