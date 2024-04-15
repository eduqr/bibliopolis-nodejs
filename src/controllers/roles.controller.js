import { sendError } from "../utils/errorHandler.js";
import { StatusCode } from "../utils/httpStatus.js";
import { operations } from "../dbOperations/roles.operations.js";

const getRoles = async (request, response) => {
  try {
    const data = await operations.getRoles();
    response.status(StatusCode.OK).json(data);
  } catch (error) {
    await sendError(error, response);
  }
};

export { getRoles };
