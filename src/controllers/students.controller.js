import dotenv from "dotenv";
import { connection } from "../config/config.js";

dotenv.config();

const getStudents = (request, response) => {
  connection.query("SELECT * FROM students", (error, results) => {
    if (error) {
      response.status(500).json({ error: "Error al obtener estudiantes" });
    } else {
      response.status(200).json(results);
    }
  });
};

const createStudent = (request, response) => {
  const { id, name, lastname, email, career_id } = request.body;
  connection.query(
    "INSERT INTO students (id, name, lastname, email, career_id) VALUES (?,?,?,?,?)",
    [id, name, lastname, email, career_id],
    (error, results) => {
      if (error) {
        response.status(500).json({ error: "Error al crear el estudiante" });
      } else {
        response.status(201).json({
          "Estudiante creado con éxito": results.affectedRows,
        });
      }
    }
  );
};

const updateStudent = (request, response) => {
  const { id } = request.params;
  const { name, lastname, email, career_id } = request.body;
  connection.query(
    "UPDATE students SET name = IFNULL(?, name), lastname = IFNULL(?, lastname), email = IFNULL(?, email), career_id = IFNULL(?, career_id) WHERE id = ?",
    [name, lastname, email, career_id, id],
    (error, results) => {
      if (error) {
        response
          .status(500)
          .json({ error: "Error al actualizar el estudiante" });
      } else {
        response
          .status(200)
          .json({ "Estudiante actualizado con éxito": results.affectedRows });
      }
    }
  );
};

const deleteStudent = (request, response) => {
  const id = request.params.id;
  connection.query(
    "DELETE FROM students WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        response.status(500).json({ error: "Error al eliminar el estudiante" });
      } else {
        response.status(200).json({
          "Estudiante eliminado con éxito": results.affectedRows,
        });
      }
    }
  );
};

const getStudentById = (request, response) => {
  const id = request.params.id;
  connection.query(
    "SELECT * FROM students WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        response.status(500).json({ error: "Error al obtener el estudiante" });
      } else {
        response.status(200).json(results);
      }
    }
  );
};

export {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
};
