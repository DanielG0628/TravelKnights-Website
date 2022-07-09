import express from 'express';

import { getPosts } from '../controllers/posts';
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);

export default router;
