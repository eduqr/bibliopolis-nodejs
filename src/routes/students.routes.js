import { Router } from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  getStudentByEmail,
} from "../controllers/students.controller.js";

const router = Router();

router.get("/estudiantes", getStudents);
router.get("/estudiantes/:id", getStudentById);
router.get("/estudiantes-email", getStudentByEmail);
router.post("/estudiantes", createStudent);
router.patch("/estudiantes/:id", updateStudent);
router.delete("/estudiantes/:id", deleteStudent);

export default router;
