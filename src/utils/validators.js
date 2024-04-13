import { connection } from "../config/config.js";
import { errors } from "./errorHandler.js";

async function DBConnection() {
  try {
    await connection.query("SELECT 1");
  } catch (error) {
    throw new errors.ConnectionError();
  }
}

async function dataExists(result) {
  if (!result) {
    throw new errors.NotFoundError();
  }
}

async function studentId(id) {
  if (typeof id !== "string" || !/^\d+$/.test(id)) {
    throw new errors.ValidationError(
      id,
      "La matrícula está conformada con solo números",
      "id"
    );
  }

  // pasar bien los datos en el throw del error
  if (id.length < 9 || id.length > 10) {
    throw new errors.ValidationError(
      id,
      "La matrícula debe tener entre 9 y 10 números",
      "matricula"
    );
  }
}

async function number(num) {
  if (!isNaN(num)) {
    throw new errors.ValidationError();
  }
}
const validate = {
  DBConnection,
  dataExists,
  number,
  studentId,
};
export { validate };
