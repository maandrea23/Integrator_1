import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import { getProfile, updateProfile, listProducts, createProduct, updateProduct, deleteProduct, listContacts, updateContact } from "../controllers/providerController.js";
import { productRules, validateBody } from "../middlewares/validate.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();
router.use(authenticate, authorize("provider"));
router.get("/me", asyncHandler(getProfile));
router.patch("/me", asyncHandler(updateProfile));
router.get("/products", asyncHandler(listProducts));
router.post("/products", validateBody(productRules), asyncHandler(createProduct));
router.patch("/products/:id", asyncHandler(updateProduct));
router.delete("/products/:id", asyncHandler(deleteProduct));
router.get("/contacts", asyncHandler(listContacts));
router.patch("/contacts/:id", validateBody({ status: { required: true, oneOf: ["sent", "read", "answered"] } }), asyncHandler(updateContact));
export default router;
