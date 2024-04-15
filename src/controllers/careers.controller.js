import { sendError } from "../utils/errorHandler.js";
import { StatusCode } from "../utils/httpStatus.js";
import { operations } from "../dbOperations/careers.operations.js";

const getCareers = async (request, response) => {
  try {
    const data = await operations.getCareers();
    response.status(StatusCode.OK).json(data);
  } catch (error) {
    await sendError(error, response);
  }
};

export { getCareers };
