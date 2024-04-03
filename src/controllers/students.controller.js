import { connection } from "../config/config.js";

const getStudents = async (request, response) => {
  try {
    const [rows] = await connection.query("CALL spGetStudents");
    const data = rows[0];
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener estudiantes" });
  }
};

const getStudentById = async (request, response) => {
  try {
    const { id } = request.params;
    const [rows] = await connection.query("CALL spGetStudentById(?)", [id]);
    const data = rows[0][0];
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener el estudiante" });
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
