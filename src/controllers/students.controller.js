import { connection } from "../config/config.js";
import { errors } from "../utils/errorHandler.js";
import { validate } from "../utils/validators.js";
import { StatusCode } from "../utils/httpStatus.js";
import { getStudentsFromDB } from "../dbOperations/students.operations.js";

const getStudents = async (request, response) => {
  try {
    const data = await getStudentsFromDB();
    response.status(StatusCode.OK).json(data);
  } catch (error) {
    if (error instanceof errors.ConnectionError) {
      response
        .status(error.httpCode)
        .json({ error: error.name, description: error.description });
    } else if (error instanceof errors.NotFoundError) {
      response.status(error.httpCode).json({
        error: error.name,
        message: "No se ha encontrado la matrícula proporcionada",
      });
    } else {
      response.status(StatusCode.INTERNAL_SERVER).json({
        error: error.name,
        message: "Ocurrió un error inesperado, intente de nuevo más tarde",
      });
    }
  }
};

const getStudentById = async (request, response) => {
  try {
    await validate.DBConnection();

    const { id } = request.params;
    const [rows] = await connection.query("CALL spGetStudentById(?)", [id]);
    const data = rows[0][0];

    await validate.studentId(id);
    await validate.dataExists(data);

    response.status(StatusCode.OK).json(data);
  } catch (error) {
    if (
      error instanceof errors.ConnectionError ||
      error instanceof errors.NotFoundError
    ) {
      response
        .status(error.httpCode)
        .json({ error: error.name, description: error.description });
    } else if (error instanceof errors.ValidationError) {
      response.status(error.httpCode).json({
        error: error.name,
        message: error.message,
        data: error.data,
        field: error.field,
      });
    } else {
      response
        .status(StatusCode.INTERNAL_SERVER)
        .json({ error: "Ocurrió un error inesperado" });
    }
  }
};

const createStudent = async (request, response) => {
  try {
    const { id, name, lastname, email, career_id } = request.body;
    const [rows] = await connection.query("CALL spCreateStudent(?,?,?,?,?)", [
      id,
      name,
      lastname,
      email,
      career_id,
    ]);
    response.status(201).json({
      "Estudiante creado con éxito": rows.affectedRows,
    });
  } catch (error) {
    response.status(500).json({ error: "Error al crear el estudiante" });
  }
};

const updateStudent = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, lastname, email, career_id } = request.body;
    const [rows] = await connection.query("CALL spUpdateStudent(?,?,?,?,?)", [
      id,
      name,
      lastname,
      email,
      career_id,
    ]);
    response
      .status(201)
      .json({ "Estudiante actualizado con éxito": rows.affectedRows });
  } catch (error) {
    response.status(500).json({ error: "Error al actualizar el estudiante" });
  }
};

const deleteStudent = async (request, response) => {
  try {
    const { id } = request.params;
    const [rows] = await connection.query("CALL spDeleteStudent(?)", [id]);
    response.sendStatus(204);
  } catch (error) {
    response.status(500).json({ error: "Error al eliminar el estudiante" });
  }
};

export {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
};
