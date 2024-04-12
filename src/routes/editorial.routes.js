import { Router } from "express";
import { getEditorials, getEditorialById } from "../controllers/editorial.controller.js";

const router = Router();

router.get("/editorial", getEditorials);
router.get("/editorial/:id", getEditorialById);

export default router;
