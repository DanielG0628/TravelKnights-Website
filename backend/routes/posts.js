import express from 'express';

import { addMemory, getUser, createUser, verifyEmail, getCurrentUser } from '../controllers/users.js';
const router = express.Router();

router.post('/api/login', getUser);
router.post('/api/register', createUser);
router.post('/api/verifyEmail', verifyEmail);  
router.post('/api/addMemory', addMemory);
router.post('/api/getCurrentUser', getCurrentUser);

export default router;
