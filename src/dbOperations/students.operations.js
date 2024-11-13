import { connection } from "../config/config.js";
import { validate } from "../utils/validators/globalValidators.js";
import { validateStudent } from "../utils/validators/students.validators.js";

const getStudentsFromDB = async () => {
  await validate.DBConnection();
  const [rows] = await connection.query("CALL spGetStudents");
  const data = rows[0];
  await validateStudent.queryResultGetStudents(data);
  return data;
};

const getStudentById = async (request) => {
  const { id } = request.params;

  await validateStudent.studentId(id);
  await validate.DBConnection();

  const [rows] = await connection.query("CALL spGetStudentById(?)", [id]);
  const data = rows[0][0];
  await validateStudent.queryResultGetStudentById(data, id);
  return data;
};

const getStudentByEmail = async (request) => {
  const { email } = request.params;

  await validateStudent.studentEmail(email);
  await validate.DBConnection();

  const [rows] = await connection.query("CALL spGetStudentByEmail(?)", [email]);
  const data = rows[0][0];
  await validateStudent.queryResultGetStudentByEmail(data, email);
  return data;
};

const createStudent = async (request) => {
  const { id, name, lastname, email, career_id } = request.body;

  await validateStudent.studentId(id);
  await validateStudent.studentName(name);
  await validateStudent.studentLastname(lastname);
  await validateStudent.studentEmail(email);
  await validateStudent.studentCareer(career_id);
  await validate.DBConnection();

  const [rows] = await connection.query("CALL spCreateStudent(?,?,?,?,?)", [
    id,
    name,
    lastname,
    email,
    career_id,
  ]);

  const data = {
    affectedRows: rows.affectedRows,
    message: "Estudiante creado con éxito",
    id: id,
  };
  return data;
};

const updateStudent = async (request) => {
  const { id } = request.params;
  const { name, lastname, email, career_id } = request.body;

  await validateStudent.studentId(id);

  if (request.body.hasOwnProperty("name")) {
    await validateStudent.studentName(name);
  }

  if (request.body.hasOwnProperty("lastname")) {
    await validateStudent.studentLastname(lastname);
  }

  if (request.body.hasOwnProperty("email")) {
    await validateStudent.studentEmail(email);
  }

  if (request.body.hasOwnProperty("career_id")) {
    await validateStudent.studentCareer(career_id);
  }

  await validate.DBConnection();

  // Comprobar que exista el alumno
  const [prev] = await connection.query("CALL spGetStudentById(?)", [id]);
  const potentialStudent = prev[0][0];
  await validateStudent.queryResultGetStudentById(potentialStudent, id);

  const [rows] = await connection.query("CALL spUpdateStudent(?,?,?,?,?)", [
    id,
    name,
    lastname,
    email,
    career_id,
  ]);

  const data = {
    affectedRows: rows.affectedRows,
    message: "Estudiante actualizado con éxito",
    id: id,
  };

  return data;
};

const deleteStudent = async (request) => {
  const { id } = request.params;
  await validateStudent.studentId(id);
  await validate.DBConnection();

  // Comprobar que exista el alumno
  const [prev] = await connection.query("CALL spGetStudentById(?)", [id]);
  const potentialStudent = prev[0][0];
  await validateStudent.queryResultGetStudentById(potentialStudent, id);

  const [rows] = await connection.query("CALL spDeleteStudent(?)", [id]);
};

const operations = {
  getStudentsFromDB,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentByEmail,
};

export { operations };
