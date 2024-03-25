import { Router } from "express";
import { getEditorial } from "../controllers/editorial.controller.js";

const router = Router();

router.get("/editorial", getEditorial);

export default router;
