import dotenv from "dotenv";
import { connection } from "../config/config.js";

dotenv.config();

const getLoans = (request, response) => {
  connection.query("SELECT * FROM loans", (error, results) => {
    if (error) throw error;
    response.status(200).json(results);
  });
};

export { getLoans };
