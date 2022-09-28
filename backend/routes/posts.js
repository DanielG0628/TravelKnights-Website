import express from 'express';

<<<<<<< HEAD
import { getUser, createUser, verifyEmail, addMemory, updateMemory, deleteMemory } from '../controllers/users.js';
=======
import {
  addMemory,
  getUser,
  getUser2,
  createUser,
  createUser2,
  verifyEmail,
  resetPasswordSent,
  resetPassword,
  getCurrentUser,
  updateMemory,
  deleteMemory,
} from '../controllers/users.js';
>>>>>>> 60d0a1dfafb905849eee463ed9ba2091e25e3cbc
const router = express.Router();

router.post('/api/login2', getUser2);
router.post('/api/login', getUser);
router.post('/api/register', createUser);
router.post('/api/register2', createUser2);
router.post('/api/verifyEmail', verifyEmail);
<<<<<<< HEAD
router.post('/api/addMemory', addMemory);  
router.post('/api/updateMemory', updateMemory);
router.post('/api/deleteMemory', deleteMemory);    

=======
router.post('/api/resetPasswordSent', resetPasswordSent);
router.post('/api/resetPassword', resetPassword);
router.post('/api/addMemory', addMemory);
router.post('/api/getCurrentUser', getCurrentUser);
router.post('/api/updateMemory', updateMemory);
router.post('/api/deleteMemory', deleteMemory);
>>>>>>> 60d0a1dfafb905849eee463ed9ba2091e25e3cbc
export default router;
