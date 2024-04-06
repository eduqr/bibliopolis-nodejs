import { connection } from "../config/config.js";

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

const createBook = async (request, response) => {
  try {
    const { title, author, isbn, units, image_name, editorial_id } = request.body;
    const [rows] = await connection.query("CALL spCreateBook(?,?,?,?,?,?)", [
      title,
      author,
      isbn,
      units,
      image_name,
      editorial_id
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
    const { id } = request.params;
    const { title, author, isbn, units, image_name, editorial_id } = request.body;
    const [rows] = await connection.query("CALL spUpdateBook(?,?,?,?,?,?,?)", [
      id,
      title,
      author,
      isbn,
      units,
      image_name,
      editorial_id
    ]);
    response
      .status(201)
      .json({ "Libro actualizado con éxito": rows.affectedRows });
  } catch (error) {
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

export { 
  getBooks, 
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
