import express from 'express';

import { getUser, createUser } from '../controllers/users.js';
const router = express.Router();

router.post('/api/login', getUser);
router.post('/api/register', createUser);

export default router;
