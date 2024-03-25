import dotenv from "dotenv";
import { connection } from "../config/config.js";

dotenv.config();

const getBooks= (request, response ) => {

    connection.query("SELECT * FROM books", (error, results) => {
        if (error) {
            response.status(500).json({error: "Error al obtener los Bibliotecarios"});
        }else{
        response.status(200).json(results);
        }
      });
}

export { getBooks };

