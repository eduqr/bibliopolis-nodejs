import dotenv from "dotenv";
import { connection } from "../config/config.js";

dotenv.config();

const getLibrarians = (request, response) => {
  connection.query("SELECT * FROM librarians", (error, results) => {
    if (error) throw error;
    response.status(200).json(results);
  });
};

const postLibrarian = (request, response) => {
  const { name, lastname, email, rol_id } = request.body;
  connection.query(
    "INSERT INTO librarians (name, lastname, email, rol_id) VALUES (?,?,?,?)",
    [name, lastname, email, rol_id],
    (error, results) => {
      if (error) throw error;
      response
        .status(201)
        .json({ "Item añadido correctamente": results.affectedRows });
    }
  );
};

const updateLibrarian = (request, response) => {
  const librarianId = request.params.id;
  const { name, lastname, email, rol_id } = request.body;
  connection.query(
    "UPDATE librarians SET name = IFNULL(?, name), lastname = IFNULL(?, lastname), email = IFNULL(?, email), rol_id = IFNULL(?, rol_id) WHERE id = ?",
    [name, lastname, email, rol_id, librarianId],
    (error, results) => {
      if (error) throw error;
      response
        .status(200)
        .json({ "Item Actualizado correctamente": results.affectedRows });
    }
  );
};

const deleteLibrarian = (request, response) => {
  const id = request.params.id;
  connection.query(
    "DELETE FROM librarians WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .json({ "Item Eliminado correctamente": results.affectedRows });
    }
  );
};

export { getLibrarians, postLibrarian, updateLibrarian, deleteLibrarian };
