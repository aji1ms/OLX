import { Router } from "express";
import { getCategories, getCategory } from "./category.controller.js";

const router = Router();

router.get("/", getCategories);
router.get("/:slug", getCategory);

export default router;
