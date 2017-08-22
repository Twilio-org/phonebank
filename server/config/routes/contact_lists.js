import express from 'express';
import fileUpload from 'express-fileupload';
import { saveNewContactList,
         updateContactListById,
         getAllContactLists,
         getContactListById,
         addContactToContactList } from '../../controllers/contact_lists';
// add updateContactInvalidNumberById
const router = express.Router();

router.route('/').get(getAllContactLists);
router.route('/').post(fileUpload(), saveNewContactList);
router.route('/:id').get(getContactListById);
router.route('/:id').put(updateContactListById);
router.route('/:id/contacts').post(addContactToContactList);

export default router;
