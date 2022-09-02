import express from 'express';
import contactController from '../controllers/contactController.js';

const router = express.Router();

router.post('/contact', contactController);

export default router;