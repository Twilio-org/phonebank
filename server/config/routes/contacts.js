import express from 'express';
import { saveNewContact,
         updateContactById,
         getContactById,
         updateContactDoNotCallById } from '../../controllers/contacts';
// add updateContactInvalidNumberById
const router = express.Router();

router.route('/').post(saveNewContact);
router.route('/:id').get(getContactById);
router.route('/:id').put(updateContactById);
router.route('/:id').patch(updateContactDoNotCallById);

export default router;

