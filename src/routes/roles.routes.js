import { Router } from "express";
import { getRoles } from "../controllers/roles.controller.js";

const router = Router();

router.get("/roles", getRoles);

export default router;
