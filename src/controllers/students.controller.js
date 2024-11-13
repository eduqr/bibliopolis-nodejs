import { sendError } from "../utils/errorHandler.js";
import { StatusCode } from "../utils/httpStatus.js";
import { operations } from "../dbOperations/students.operations.js";

const getStudents = async (request, response) => {
  try {
    const data = await operations.getStudentsFromDB();
    response.status(StatusCode.OK).json(data);
  } catch (error) {
    await sendError(error, response);
  }
};

const getStudentById = async (request, response) => {
  try {
    const data = await operations.getStudentById(request);
    response.status(StatusCode.OK).json(data);
  } catch (error) {
    await sendError(error, response);
  }
};

const getStudentByEmail = async (request, response) => {
  try {
    const data = await operations.getStudentByEmail(request);
    response.status(StatusCode.OK).json(data);
  } catch (error) {
    await sendError(error, response);
  }
};

const createStudent = async (request, response) => {
  try {
    const data = await operations.createStudent(request);
    response.status(StatusCode.CREATED).json(data);
  } catch (error) {
    await sendError(error, response);
  }
};

const updateStudent = async (request, response) => {
  try {
    const data = await operations.updateStudent(request);
    response.status(StatusCode.OK).json(data);
  } catch (error) {
    await sendError(error, response);
  }
};

const deleteStudent = async (request, response) => {
  try {
    await operations.deleteStudent(request);
    response.sendStatus(StatusCode.NO_CONTENT);
  } catch (error) {
    await sendError(error, response);
  }
};

export {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  getStudentByEmail,
};
