import express from 'express';
import { getRating, postRating } from '../controllers/ratingControllers.js';

const router = express.Router();

router
    .route('/rating')
        .get(getRating)
        .post(postRating);

export default router;