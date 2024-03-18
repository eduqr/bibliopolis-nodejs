import dotenv from "dotenv";
import { connection } from "../config/config.js";

dotenv.config();

const getRoles = (request, response) => {
  connection.query("SELECT * FROM roles", (error, results) => {
    if (error) throw error;
    response.status(200).json(results);
  });
};

export { getRoles };
