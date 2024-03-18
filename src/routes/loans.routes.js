import { Router } from "express";
import { getLoans } from "../controllers/loans.controller.js";

const router = Router();

router.get("/prestamos", getLoans);

export default router;
