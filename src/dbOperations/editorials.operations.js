import { connection } from "../config/config.js";
import { validate } from "../utils/validators/globalValidators.js";
import { validateEditorials } from "../utils/validators/editorials.validators.js";

const getEditorials = async () => {
  await validate.DBConnection();
  const [rows] = await connection.query("CALL spGetEditorials");
  const data = rows[0];
  await validateEditorials.queryResultGetEditorials(data);
  return data;
};

const getEditorialById = async (request) => {
  const { id } = request.params;

  await validateEditorials.editorialId(id);
  await validate.DBConnection();

  const [rows] = await connection.query("CALL spGetEditorialById(?)", [id]);
  const data = rows[0][0];
  await validateEditorials.queryResultGetEditorialById(data, id);
  return data;
};

const operations = {
  getEditorials,
  getEditorialById,
};

export { operations };
