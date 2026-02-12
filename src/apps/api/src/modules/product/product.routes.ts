import { Router } from "express";
import { createProduct, getProducts, getProduct, getProductsByCategory } from "./product.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";

const router = Router();

router.post("/", authenticate, upload.array("images", 4), createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/category/:categoryId", getProductsByCategory);

export default router; 