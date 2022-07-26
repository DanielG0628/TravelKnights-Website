import express from "express";

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
} from "../controllers/users.js";
const router = express.Router();

router.post("/api/login2", getUser2);
router.post("/api/login", getUser);
router.post("/api/register", createUser);
router.post("/api/register2", createUser2);
router.post("/api/verifyEmail", verifyEmail);
router.post("/api/resetPasswordSent", resetPasswordSent);
router.post("/api/resetPassword", resetPassword);
router.post("/api/addMemory", addMemory);
router.post("/api/getCurrentUser", getCurrentUser);
router.post("/api/updateMemory", updateMemory);
router.post("/api/deleteMemory", deleteMemory);
export default router;
