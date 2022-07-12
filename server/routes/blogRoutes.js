import express from 'express';
import {blogPosts, refreshBlogs} from "../controllers/blogControllers.js";

const router = express.Router();

router.get('/get-blog-posts', blogPosts);

router.post('/refresh-blogs', refreshBlogs);

export default router;