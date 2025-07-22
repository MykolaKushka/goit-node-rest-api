import express from "express";
import {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
  resendVerifyEmail,
} from "../controllers/authController.js";
import { verifyEmail } from "../controllers/verifyController.js"; // ✅ імпорт нового контролера
import validateBody from "../middlewares/validateBody.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/login", validateBody(loginSchema), login);

router.post("/logout", auth, logout);

router.get("/current", auth, getCurrent);

router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

router.post("/verify", resendVerifyEmail);

export default router;
