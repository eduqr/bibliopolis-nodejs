import { Router } from "express";
import { getLoans, deleteLoan, createLoan, getLoanById, updateLoan, getLoanActive  } from "../controllers/loans.controller.js";

const router = Router();

router.get("/prestamos", getLoans);
router.post("/prestamos", createLoan);
router.get("/prestamos/:id", getLoanById);
router.get("/prestamosActivos/:id", getLoanActive);
router.patch("/prestamos/:id", updateLoan);
router.delete("/prestamos/:id", deleteLoan);

export default router;
