import dotenv from "dotenv";
import { connection } from "../config/config.js";

dotenv.config();

const getStudents = (request, response) => {
  connection.query("SELECT * FROM students", (error, results) => {
    if (error) throw error;
    response.status(200).json(results);
  });
};

const createStudent = (request, response) => {
  const { id, name, lastname, email, career_id } = request.body;
  connection.query(
    "INSERT INTO students (id, name, lastname, email, career_id) VALUES (?,?,?,?,?)",
    [id, name, lastname, email, career_id],
    (error, results) => {
      if (error) throw error;
      response.status(201).json({
        "Item añadido correctamente": results.affectedRows,
      });
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
      if (error) throw error;
      response
        .status(200)
        .json({ "Item actualizado correctamente": results.affectedRows });
    }
  );
};

const deleteStudent = (request, response) => {
  const id = request.params.id;
  connection.query(
    "DELETE FROM students WHERE id = ?",
    [id],
    (error, results) => {
      if (error) throw error;
      response.status(200).json({
        "Item eliminado correctamente": results.affectedRows,
      });
    }
  );
};

export { getStudents, createStudent, updateStudent, deleteStudent };
