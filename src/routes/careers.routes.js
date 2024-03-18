import { Router } from "express";
import { getCareers } from "../controllers/careers.controller.js";

const router = Router();

router.get("/carreras", getCareers);

export default router;
