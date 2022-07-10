import express from 'express';

import { getUser, createUser } from '../controllers/users.js';
const router = express.Router();

router.get('/users', getUser);
router.post('/users', createUser);

export default router;
