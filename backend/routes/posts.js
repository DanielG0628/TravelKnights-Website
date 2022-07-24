import express from 'express';
//import addMemory
import { getUser, createUser, verifyEmail } from '../controllers/users.js';
const router = express.Router();

router.post('/api/login', getUser);
router.post('/api/register', createUser);
router.post('/api/verifyEmail', verifyEmail);  
//router.post('/api/Map', addMemory);

export default router;
