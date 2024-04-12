import { connection } from "../config/config.js";
import fs from "node:fs"

function saveImage(file){
  const newPath =  `../../uploads/${file.originalname}`;
  fs.renameSync(file.path, newPath);
  return newPath;

}

const getBooks = async (request, response) => {
  try {
    const [rows] = await connection.query("CALL spGetBooks");
    const data = rows[0];
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener los libros" });
  }
};

const getBookById = async (request, response) => {
  try {
    const { id } = request.params;
    const [rows] = await connection.query("CALL spGetBookById(?)", [id]);
    const data = rows[0][0];
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener el libro" });
  }
};

const createBook = async  (request, response) => {
  try {
    console.log("Archivo recibido:", request.file);
    const { title, author, isbn, units, editorial_id } = request.body;
    
    const image_name = request.file ? request.file.filename : '';  // Ya debería tener el nombre original

    const [rows] = await connection.query("CALL spCreateBook(?,?,?,?,?,?)", [
      title,
      author,
      isbn,
      units,
      image_name,
      editorial_id,
    ]);

    response.status(201).json({
      "Libro creado con éxito": rows.affectedRows,
    });
  } catch (error) {
    response.status(500).json({ error: "Error al crear el libro" });
  }
};

const updateBook = async (request, response) => {
  try {
    console.log("Archivo recibido:", request.file);

    // Extraer el ID del libro desde los parámetros de la URL
    const { id } = request.params;

    // Extraer los campos del libro desde el cuerpo de la solicitud
    const { title, author, isbn, units, editorial_id } = request.body;

    // Determinar el nombre de la imagen:
    // Si se recibió un nuevo archivo, usa ese nombre.
    // Si no se recibió un nuevo archivo, intenta usar el existente (ya deberías tenerlo almacenado).
    // Puedes decidir manejar un valor por defecto o error si no hay ninguno disponible.
    const image_name = request.file ? request.file.filename : request.body.image_name;

    // Ejecutar el procedimiento almacenado para actualizar el libro
    const [rows] = await connection.query("CALL spUpdateBook(?,?,?,?,?,?,?)", [
      id,
      title,
      author,
      isbn,
      units,
      image_name,
      editorial_id,
    ]);

    // Comprobar el resultado del procedimiento almacenado y responder adecuadamente
    if (rows.affectedRows > 0) {
      response.status(200).json({ message: "Libro actualizado con éxito", affectedRows: rows.affectedRows });
    } else {
      response.status(404).json({ error: "No se encontró el libro para actualizar o no se realizaron cambios" });
    }
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    response.status(500).json({ error: "Error al actualizar el libro" });
  }
};


const deleteBook = async (request, response) => {
  try {
    const { id } = request.params;
    const [rows] = await connection.query("CALL spDeleteBook(?)", [id]);
    response.sendStatus(204);
  } catch (error) {
    response.status(500).json({ error: "Error al eliminar el libro" });
  }
};

export { getBooks, getBookById, createBook, updateBook, deleteBook };
