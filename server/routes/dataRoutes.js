import express from 'express';
import auth from '../middleware/auth.js';
import {getUserDataController, updateUserDataController, topUsersController} from '../controllers/userDataControllers.js';

const router = express.Router();

router.post('/get-user-data', auth, getUserDataController);
router.put('/update-user-data', auth, updateUserDataController);
router.get('/top-users',auth, topUsersController);

export default router;