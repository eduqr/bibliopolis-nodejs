import { Router } from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/students.controller.js";

const router = Router();

router.get("/estudiantes", getStudents);
router.post("/estudiantes", createStudent);
router.patch("/estudiantes/:id", updateStudent);
router.delete("/estudiantes/:id", deleteStudent);

export default router;
