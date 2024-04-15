import { connection } from "../config/config.js";
import { validate } from "../utils/validators/globalValidators.js";
import { validateRoles } from "../utils/validators/roles.validators.js";

const getRoles = async () => {
  await validate.DBConnection();
  const [rows] = await connection.query("CALL spGetRoles");
  const data = rows[0];
  await validateRoles.queryResultGetRoles(data);
  return data;
};

const operations = {
  getRoles,
};

export { operations };
