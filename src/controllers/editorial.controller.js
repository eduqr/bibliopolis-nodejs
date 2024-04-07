import { connection } from "../config/config.js";

const getEditorials = async (request, response) => {
  try {
    const [rows] = await connection.query("CALL spGetEditorials");
    const data = rows[0];
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener las editoriales" });
  }
};

const getEditorialById = async (request, response) => {
  try {
    const { id } = request.params;
    const [rows] = await connection.query("CALL spGetEditorialById(?)", [id]);
    const data = rows[0][0];
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener la editorial" });
  }
};

const createEditorial = async (request, response) => {
  try {
    const { name } = request.body;
    const [rows] = await connection.query("CALL spCreateEditorial(?)", [
      name,
    ]);
    response.status(201).json({
      "Editorial creada con éxito": rows.affectedRows,
    });
  } catch (error) {
    response.status(500).json({ error: "Error al crear la editorial" });
  }
};

const updateEditorial = async (request, response) => {
  try {
    const { id } = request.params;
    const { name } = request.body;
    const [rows] = await connection.query("CALL spUpdateEditorial(?,?)", [
      id,
      name,
    ]);
    response
      .status(201)
      .json({ "Editorial actualizada con éxito": rows.affectedRows });
  } catch (error) {
    response.status(500).json({ error: "Error al actualizar la editorial" });
  }
};

const deleteEditorial = async (request, response) => {
  try {
    const { id } = request.params;
    const [rows] = await connection.query("CALL spDeleteEditorial(?)", [id]);
    response.sendStatus(204);
  } catch (error) {
    response.status(500).json({ error: "Error al eliminar la editorial" });
  }
};

export { 
  getEditorials, 
  getEditorialById,
  createEditorial,
  updateEditorial,
  deleteEditorial
};