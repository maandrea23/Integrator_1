import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import { list, get, create, update, remove, dashboard } from "../controllers/adminController.js";
import { listAll } from "../controllers/estimateController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();
router.use(authenticate, authorize("admin"));
router.get("/dashboard", asyncHandler(dashboard));
router.get("/estimates", asyncHandler(listAll));
router.get("/:entity", asyncHandler(list));
router.post("/:entity", asyncHandler(create));
router.get("/:entity/:id", asyncHandler(get));
router.patch("/:entity/:id", asyncHandler(update));
router.delete("/:entity/:id", asyncHandler(remove));
export default router;
