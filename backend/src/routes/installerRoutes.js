import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import { getProfile, updateProfile, listContacts, updateContact } from "../controllers/installerController.js";
import { validateBody } from "../middlewares/validate.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();
router.use(authenticate, authorize("installer"));
router.get("/me", asyncHandler(getProfile));
router.patch("/me", asyncHandler(updateProfile));
router.get("/contacts", asyncHandler(listContacts));
router.patch("/contacts/:id", validateBody({ status: { required: true, oneOf: ["sent", "read", "answered"] } }), asyncHandler(updateContact));
export default router;
