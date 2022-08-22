import express from 'express';
import { videoOfTheDayController, searchVideos, searchVideo, getMyVideos, quizController } from '../controllers/videosControllers.js';

const router = express.Router();

router.get('/video-of-the-day', videoOfTheDayController);
router.get('/quiz', quizController);
router.post('/searchVideos', searchVideos);
router.post('/searchVideo', searchVideo);
router.post('/get-my-videos', getMyVideos);

export default router;