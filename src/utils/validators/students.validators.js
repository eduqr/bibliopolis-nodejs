import { connection } from "../../config/config.js";
import { errors } from "../errorHandler.js";
import { validate } from "./globalValidators.js";

const field = {
  id: "id",
  name: "name",
  lastname: "lastname",
  email: "email",
  career: "career",
};

let errorMessage;

async function studentId(id) {
  const minStudentId = 9;
  const maxStudentId = 10;

  if (!(await validate.dataExists(id))) {
    errorMessage = "La matrícula es obligatoria";
    throw new errors.ValidationError(errorMessage, id, field.id);
  }

  if (typeof id !== "string" || !/^\d+$/.test(id)) {
    errorMessage = "La matrícula sólo puede tener números";
    throw new errors.ValidationError(errorMessage, id, field.id);
  }

  if (!(await validate.checkLength(id, minStudentId, maxStudentId))) {
    errorMessage = `La matrícula debe tener entre ${minStudentId} y ${maxStudentId} dígitos`;
    throw new errors.ValidationError(errorMessage, id, field.id);
  }
}

async function studentName(name) {
  const minLength = 1;
  const maxLength = 40;

  if (!(await validate.dataExists(name))) {
    errorMessage = "El nombre es obligatorio";
    throw new errors.ValidationError(errorMessage, name, field.name);
  }

  if (!(await validate.checkLength(name, minLength, maxLength))) {
    errorMessage = `El nombre debe tener entre ${minLength} y ${maxLength} caracteres`;
    throw new errors.ValidationError(errorMessage, name, field.name);
  }
}

async function studentLastname(lastname) {
  const minLength = 1;
  const maxLength = 40;

  if (!(await validate.dataExists(lastname))) {
    errorMessage = "El apellido es obligatorio";
    throw new errors.ValidationError(errorMessage, lastname, field.lastname);
  }

  if (!(await validate.checkLength(lastname, minLength, maxLength))) {
    errorMessage = `El apellido debe tener entre ${minLength} y ${maxLength} caracteres`;
    throw new errors.ValidationError(errorMessage, lastname, field.lastname);
  }
}

async function studentEmail(email) {
  if (!(await validate.dataExists(email))) {
    errorMessage = "El correo es obligatorio";
    throw new errors.ValidationError(errorMessage, email, field.email);
  }

  if (!(await validate.checkEmail(email))) {
    errorMessage =
      "Verifique el correo (sólo se aceptan dominios de gmail, outlook y el institucional)";
    throw new errors.ValidationError(errorMessage, email, field.email);
  }
}

async function studentCareer(careerId) {
  if (!(await validate.dataExists(careerId))) {
    errorMessage = "La carrera es obligatoria";
    throw new errors.ValidationError(errorMessage, careerId, field.career);
  }

  validate.DBConnection();

  const [rows] = await connection.query("CALL spGetCareers");
  const data = rows[0];
  const min = 1;
  const max = data.length;

  if (!(await validate.checkNumberRange(careerId, min, max))) {
    errorMessage = `La carrera ingresada no existe`;
    throw new errors.ValidationError(errorMessage, careerId, field.career);
  }
}

async function queryResultGetStudents(data) {
  if (!(await validate.dataExists(data))) {
    errorMessage = "No existen estudiantes registrados";
    throw new errors.NotFoundError(errorMessage);
  }
}

async function queryResultGetStudentById(data, id) {
  if (!(await validate.dataExists(data))) {
    errorMessage = "No se encontró el estudiante";
    throw new errors.NotFoundError(errorMessage, id);
  }
}

async function queryResultGetStudentByEmail(data, email) {
  if (!(await validate.dataExists(data))) {
    errorMessage = "No se encontró el estudiante";
    throw new errors.NotFoundError(errorMessage, email);
  }
}

const validateStudent = {
  studentId,
  studentName,
  studentLastname,
  studentEmail,
  studentCareer,
  queryResultGetStudents,
  queryResultGetStudentById,
  queryResultGetStudentByEmail,
};

export { validateStudent };
