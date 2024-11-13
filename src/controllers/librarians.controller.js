import { connection } from "../config/config.js";

const getLibrarians = async (request, response) => {
  try {
    const [rows] = await connection.query("CALL spGetLibrarians");
    const data = rows[0];
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener los bibliotecarios" });
  }
};

const getLibrarianById = async (request, response) => {
  try {
    const { id } = request.params;
    const [rows] = await connection.query("CALL spGetLibrarianById(?)", [id]);
    const data = rows[0][0];
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener el bibliotecario" });
  }
};

const getLibrarianByEmail = async (request, response) => {
  try {
    const { email } = request.body;
    const [rows] = await connection.query("CALL spGetLibrarianByEmail(?)", [
      email,
    ]);
    const data = rows[0][0];
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener el bibliotecario" });
  }
};

const createLibrarian = async (request, response) => {
  try {
    const { name, lastname, email, rol_id } = request.body;
    const [rows] = await connection.query("CALL spCreateLibrarian(?,?,?,?)", [
      name,
      lastname,
      email,
      rol_id,
    ]);
    response.status(201).json({
      "Bibliotecario creado con éxito": rows.affectedRows,
    });
  } catch (error) {
    response.status(500).json({ error: "Error al crear el bibliotecario" });
  }
};

const updateLibrarian = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, lastname, email, rol_id } = request.body;
    const [rows] = await connection.query("CALL spUpdateLibrarian(?,?,?,?,?)", [
      id,
      name,
      lastname,
      email,
      rol_id,
    ]);
    response
      .status(201)
      .json({ "Bibliotecario actualizado con éxito": rows.affectedRows });
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error al actualizar el bibliotecario" });
  }
};

const deleteLibrarian = async (request, response) => {
  try {
    const { id } = request.params;
    const [rows] = await connection.query("CALL spDeleteLibrarian(?)", [id]);
    response.sendStatus(204);
  } catch (error) {
    response.status(500).json({ error: "Error al eliminar el bibliotecario" });
  }
};

export {
  getLibrarians,
  getLibrarianById,
  getLibrarianByEmail,
  createLibrarian,
  updateLibrarian,
  deleteLibrarian,
};
