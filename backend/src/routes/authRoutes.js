import { Router } from "express";
import { register, login, me } from "../controllers/authController.js";
import { authenticate } from "../middlewares/auth.js";
import { validateBody, userRules } from "../middlewares/validate.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();
router.post("/register", validateBody(userRules), asyncHandler(register));
router.post("/login", validateBody({ email: { required: true, email: true }, password: { required: true } }), asyncHandler(login));
router.get("/me", authenticate, asyncHandler(me));
export default router;
