import { Router } from "express";
import {
  getLibrarians,
  postLibrarian,
  updateLibrarian,
  deleteLibrarian,
  getLibrarianById
} from "../controllers/librarians.controller.js";

const router = Router();

router.get("/bibliotecarios", getLibrarians);
router.get("/bibliotecarios/:id", getLibrarianById);
router.post("/bibliotecarios", postLibrarian);
router.patch("/bibliotecarios/:id", updateLibrarian);
router.delete("/bibliotecarios/:id", deleteLibrarian);

export default router;
