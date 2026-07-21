import { Router } from "express";
import { listProducts, getProduct, listInstallers, listCities, listAppliances } from "../controllers/catalogController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();
router.get("/products", asyncHandler(listProducts));
router.get("/products/:id", asyncHandler(getProduct));
router.get("/installers", asyncHandler(listInstallers));
router.get("/cities", asyncHandler(listCities));
router.get("/appliances", asyncHandler(listAppliances));
export default router;
