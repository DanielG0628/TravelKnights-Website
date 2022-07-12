import express from 'express';

import { getUser, createUser } from '../controllers/users.js';
const router = express.Router();

router.get('/api/login', getUser);
router.post('/api/register', createUser);

export default router;
