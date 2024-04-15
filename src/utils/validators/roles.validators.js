import { connection } from "../../config/config.js";
import { errors } from "../errorHandler.js";
import { validate } from "./globalValidators.js";

async function queryResultGetRoles(data) {
  if (!(await validate.dataExists(data))) {
    errorMessage = "No existen roles registrados";
    throw new errors.NotFoundError(errorMessage);
  }
}

const validateRoles = {
  queryResultGetRoles,
};

export { validateRoles };
