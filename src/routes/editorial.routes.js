import { Router } from "express";
import { getEditorials } from "../controllers/editorial.controller.js";

const router = Router();

router.get("/editorial", getEditorials);

export default router;
