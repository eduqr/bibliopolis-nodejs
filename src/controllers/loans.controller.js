import { connection } from "../config/config.js";

const getLoans = async (request, response) => {
  try {
    const [rows] = await connection.query("CALL spGetLoans");
    const data = rows[0];
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener los préstamos" });
  }
};

const getLoanById = async (request, response) => {
  try {
    const { id } = request.params;
    const [rows] = await connection.query("CALL spGetLoanById(?)", [id]);
    const data = rows[0][0];
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener el préstamo" });
  }
};

const createLoan = async (request, response) => {
  try {
    const { start_date, end_date, status, student_id, book_id } = request.body;
    const [rows] = await connection.query("CALL spCreateLoan(?,?,?,?,?)", [
      start_date,
      end_date,
      status,
      student_id,
      book_id,
    ]);
    response.status(201).json({
      "Préstamo creado con éxito": rows.affectedRows,
    });
  } catch (error) {
    response.status(500).json({ error: "Error al crear el préstamo" });
  }
};

const updateLoan = async (request, response) => {
  try {
    const { id } = request.params;
    const { start_date, end_date, status, student_id, book_id } = request.body;
    const [rows] = await connection.query("CALL spUpdateLoan(?,?,?,?,?,?)", [
      id,
      start_date,
      end_date,
      status,
      student_id,
      book_id,
    ]);
    response
      .status(201)
      .json({ "Préstamo actualizado con éxito": rows.affectedRows });
  } catch (error) {
    response.status(500).json({ error: "Error al actualizar el préstamo" });
  }
};

const deleteLoan = async (request, response) => {
  try {
    const { id } = request.params;
    const [rows] = await connection.query("CALL spDeleteLoan(?)", [id]);
    response.sendStatus(204);
  } catch (error) {
    response.status(500).json({ error: "Error al eliminar el préstamo" });
  }
};

export { getLoans, getLoanById, createLoan, updateLoan, deleteLoan };
