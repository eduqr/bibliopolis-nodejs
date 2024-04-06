import { connection } from "../config/config.js";

const getCareers = async (request, response) => {
  try {
    const [rows] = await connection.query("CALL spGetCareers");
    const data = rows[0];
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener las carreras" });
  }
};


const getCareerById = async (request, response) => {
  try {
    const { id } = request.params;
    const [rows] = await connection.query("CALL spGetCareerById(?)", [id]);
    const data = rows[0][0];
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener la carrera" });
  }
};

const createCareer = async (request, response) => {
  try {
    const { name } = request.body;
    const [rows] = await connection.query("CALL spCreateCareer(?)", [
      name,
    ]);
    response.status(201).json({
      "Carrera creada con éxito": rows.affectedRows,
    });
  } catch (error) {
    response.status(500).json({ error: "Error al crear la carrera" });
  }
};

const updateCareer = async (request, response) => {
  try {
    const { id } = request.params;
    const { name } = request.body;
    const [rows] = await connection.query("CALL spUpdateCareer(?,?)", [
      id,
      name,
    ]);
    response
      .status(201)
      .json({ "Carrera actualizada con éxito": rows.affectedRows });
  } catch (error) {
    response.status(500).json({ error: "Error al actualizar la carrera" });
  }
};

const deleteCareer = async (request, response) => {
  try {
    const { id } = request.params;
    const [rows] = await connection.query("CALL spDeleteCareer(?)", [id]);
    response.sendStatus(204);
  } catch (error) {
    response.status(500).json({ error: "Error al eliminar la carrera" });
  }
};

export { 
  getCareers, 
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer
};
