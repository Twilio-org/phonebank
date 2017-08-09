import express from 'express';
import { saveNewContact,
         updateContactById,
         getContactById } from '../../controllers/contacts';

const router = express.Router();

router.route('/').post(saveNewContact);
router.route('/:id').get(getContactById);
router.route('/:id').put(updateContactById);

export default router;
