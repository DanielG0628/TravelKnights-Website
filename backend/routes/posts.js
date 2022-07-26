import express from 'express';

import {
  addMemory,
  getUser,
  createUser,
  verifyEmail,
  getCurrentUser,
  updateMemory,
  deleteMemory,
} from '../controllers/users.js';
const router = express.Router();

router.post('/api/login', getUser);
router.post('/api/register', createUser);
router.post('/api/verifyEmail', verifyEmail);
router.post('/api/addMemory', addMemory);
router.post('/api/getCurrentUser', getCurrentUser);
router.post('/api/updateMemory', updateMemory);
router.post('/api/deleteMemory', deleteMemory);
export default router;
