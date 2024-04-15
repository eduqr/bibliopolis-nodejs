import { connection } from "../config/config.js";
import { validate } from "../utils/validators/globalValidators.js";
import { validateCareers } from "../utils/validators/careers.validators.js";

const getCareers = async () => {
  await validate.DBConnection();
  const [rows] = await connection.query("CALL spGetCareers");
  const data = rows[0];
  await validateCareers.queryResultGetCareers(data);
  return data;
};

const operations = {
  getCareers,
};

export { operations };
