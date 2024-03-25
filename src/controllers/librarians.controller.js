import dotenv from "dotenv";
import { connection } from "../config/config.js";

dotenv.config();

const getLibrarians = (request, response) => {
  connection.query("SELECT * FROM librarians", (error, results) => {
    if (error) {
      response.status(500).json({error: "Error al obtener los Bibliotecarios"});
  }else{
  response.status(200).json(results);
  }
});
};
const getLibrarianById = (request, response) => {
  const librarianId = parseInt(request.params.id); 
  connection.query(
  "SELECT * FROM librarians WHERE id = ?",
  [librarianId],
  (error, results) => {
  if (error) {
  response.status(500).json({ error: "Error al obtener el bibliotecario" });
  } else if (!results.length) {
  response.status(404).json({ error: "Bibliotecario no encontrado" });
  } else {
  response.status(200).json(results[0]); 
  }
  }
  );
  };

const postLibrarian = (request, response) => {
  const { name, lastname, email, rol_id } = request.body;
  connection.query(
    "INSERT INTO librarians (name, lastname, email, rol_id) VALUES (?,?,?,?)",
    [name, lastname, email, rol_id],
    (error, results) => {
      if (error) {
      response.status(500).json({ error: "Error al añadir el bibliotecario" });
      }
      response
        .status(201)
        .json({ "Bibliotecario añadido correctamente": results.affectedRows });
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
      if (error) {
      response.status(500).json({ error: "Error al actualizar bibliotecario" });
      }
      response
        .status(200)
        .json({ "Bibliotecario Actualizado correctamente": results.affectedRows });
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
      response.status(500).json({ error: "Error al eliminar bibliotecario" });
      }
      response
        .status(200)
        .json({ "Bibliotecario Eliminado correctamente": results.affectedRows });
    }
  );
};

export { getLibrarians, postLibrarian, updateLibrarian, deleteLibrarian, getLibrarianById };
