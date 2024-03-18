import dotenv from "dotenv";
import { connection } from "../config/config.js";

dotenv.config();

const getCareers = (request, response) => {
  connection.query("SELECT * FROM Careers", (error, results) => {
    if (error) throw error;
    response.status(200).json(results);
  });
};

export { getCareers };
