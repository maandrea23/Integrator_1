import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import { createEstimate, listMine, getEstimate, updateEstimate, deleteEstimate, contact } from "../controllers/estimateController.js";
import { validateBody } from "../middlewares/validate.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();
router.use(authenticate, authorize("user", "admin"));
router.get("/", asyncHandler(listMine));
router.post("/", validateBody({ cityHspId: { required: true, number: true, min: 1 }, inputMethod: { required: true, oneOf: ["monthly_consumption", "appliances"] } }), asyncHandler(createEstimate));
router.get("/:id", asyncHandler(getEstimate));
router.patch("/:id", validateBody({ status: { required: true, oneOf: ["draft", "completed", "archived"] } }), asyncHandler(updateEstimate));
router.delete("/:id", asyncHandler(deleteEstimate));
router.post("/:id/contacts", validateBody({ message: { required: true } }), asyncHandler(contact));
export default router;
