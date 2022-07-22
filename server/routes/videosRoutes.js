import express from 'express';
import { videoOfTheDayController, searchVideos, searchVideo } from '../controllers/videosControllers.js';

const router = express.Router();

router.get('/video-of-the-day', videoOfTheDayController);
router.post('/searchVideos', searchVideos);
router.post('/searchVideo', searchVideo);

export default router;