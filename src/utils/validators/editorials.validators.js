import { errors } from "../errorHandler.js";
import { validate } from "./globalValidators.js";

const field = {
  id: "id",
  name: "name",
};

let errorMessage;

async function editorialId(id) {
  if (!(await validate.dataExists(id))) {
    errorMessage = "La id es obligatoria";
    throw new errors.ValidationError(errorMessage, id, field.id);
  }

  if (!(await validate.isNumber(id))) {
    errorMessage = "La id debe ser un número";
    throw new errors.ValidationError(errorMessage, id, field.id);
  }
}

async function queryResultGetEditorials(data) {
  if (!(await validate.dataExists(data))) {
    errorMessage = "No existen editoriales registradas";
    throw new errors.NotFoundError(errorMessage);
  }
}

async function queryResultGetEditorialById(data, id) {
  if (!(await validate.dataExists(data))) {
    errorMessage = "No se encontró el editorial";
    throw new errors.NotFoundError(errorMessage, id);
  }
}

const validateEditorials = {
  editorialId,
  queryResultGetEditorials,
  queryResultGetEditorialById,
};

export { validateEditorials };
