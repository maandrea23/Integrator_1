import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import { updateProfile, deleteOwnAccount } from "../controllers/userController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();
router.use(authenticate, authorize("user", "installer", "provider", "admin"));
router.patch("/me", asyncHandler(updateProfile));
router.delete("/me", asyncHandler(deleteOwnAccount));
export default router;
