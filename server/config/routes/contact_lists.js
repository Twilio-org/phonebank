import express from 'express';
import { saveNewContactList,
         updateContactListById,
         getAllContactLists,
         getContactListById,
         addContactToContactList } from '../../controllers/contact_lists';
// add updateContactInvalidNumberById
const router = express.Router();

router.route('/').get(getAllContactLists);
router.route('/').post(saveNewContactList);
router.route('/:id').get(getContactListById);
router.route('/:id').put(updateContactListById);
router.route('/:id/contacts/:contact_id').post(addContactToContactList);

export default router;
