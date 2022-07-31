import express from 'express';
import auth from '../middleware/auth.js';
import getUserDataController from '../controllers/getUserDataController.js';

const router = express.Router();

router.post('/get-user-data', auth, getUserDataController);

export default router;