import { errors } from "../errorHandler.js";
import { validate } from "./globalValidators.js";

async function queryResultGetCareers(data) {
  if (!(await validate.dataExists(data))) {
    errorMessage = "No existen carreras registradas";
    throw new errors.NotFoundError(errorMessage);
  }
}

const validateCareers = {
  queryResultGetCareers,
};

export { validateCareers };
