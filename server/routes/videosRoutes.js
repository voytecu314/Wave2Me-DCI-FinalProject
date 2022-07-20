import express from 'express';
import { videoOfTheDayController } from '../controllers/videosControllers.js';

const router = express.Router();

router.get('/video-of-the-day', videoOfTheDayController);

export default router;