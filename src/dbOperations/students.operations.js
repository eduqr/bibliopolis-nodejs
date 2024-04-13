import { validate } from "../utils/validators.js";
import { connection } from "../config/config.js";

export const getStudentsFromDB = async () => {
  await validate.DBConnection();
  const [rows] = await connection.query("CALL spGetStudents");
  const data = rows[0];
  await validate.dataExists(data);
  return data;
};
