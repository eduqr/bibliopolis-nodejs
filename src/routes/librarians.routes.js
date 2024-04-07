import { Router } from "express";
import {
  getLibrarians,
  createLibrarian,
  updateLibrarian,
  deleteLibrarian,
  getLibrarianById,
} from "../controllers/librarians.controller.js";

const router = Router();

router.get("/bibliotecarios", getLibrarians);
router.get("/bibliotecarios/:id", getLibrarianById);
router.post("/bibliotecarios", createLibrarian);
router.patch("/bibliotecarios/:id", updateLibrarian);
router.delete("/bibliotecarios/:id", deleteLibrarian);

export default router;
