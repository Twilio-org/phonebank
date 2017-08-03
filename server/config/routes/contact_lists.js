import express from 'express';
import { saveNewContactList,
         updateContactListById,
         getContactListById } from '../../controllers/contact_lists';
// add updateContactInvalidNumberById
const router = express.Router();

router.route('/').post(saveNewContactList);
router.route('/:id').get(getContactListById);
router.route('/:id').put(updateContactListById);

export default router;
