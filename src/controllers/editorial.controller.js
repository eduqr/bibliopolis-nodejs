import dotenv from "dotenv";
import { connection } from "../config/config.js";

dotenv.config();

const getEditorial= (request, response ) => {

    connection.query("SELECT * FROM editorial", (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
      });
}

export { getEditorial };
