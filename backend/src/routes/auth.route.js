import express from "express";
import { login, logout, signup, updateProfile } from "../controllers/auth.controller.js";

const router = express.Router();

// auth operations are delegated to auth controller
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// check if user is authenticated, then let them update the profile
router.put("/update-profile", protectRoute, updateProfile);

export default router;
