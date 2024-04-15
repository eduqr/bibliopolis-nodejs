import { sendError } from "../utils/errorHandler.js";
import { StatusCode } from "../utils/httpStatus.js";
import { operations } from "../dbOperations/editorials.operations.js";

const getEditorials = async (request, response) => {
  try {
    const data = await operations.getEditorials();
    response.status(StatusCode.OK).json(data);
  } catch (error) {
    await sendError(error, response);
  }
};

const getEditorialById = async (request, response) => {
  try {
    const data = await operations.getEditorialById(request);
    response.status(StatusCode.OK).json(data);
  } catch (error) {
    await sendError(error, response);
  }
};

export { getEditorials, getEditorialById };
