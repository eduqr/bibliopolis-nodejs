import { Router } from "express";
import {
  getLibrarians,
  postLibrarian,
  updateLibrarian,
  deleteLibrarian,
} from "../controllers/librarians.controller.js";

const router = Router();

router.get("/bibliotecarios", getLibrarians);
router.post("/bibliotecarios", postLibrarian);
router.patch("/bibliotecarios/:id", updateLibrarian);
router.delete("/bibliotecarios/:id", deleteLibrarian);

export default router;
