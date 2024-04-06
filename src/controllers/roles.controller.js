import { connection } from "../config/config.js";

const getRoles = async (request, response) => {
  try {
    const [rows] = await connection.query("CALL spGetRoles");
    const data = rows[0];
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener Roles" });
  }
};

const getRolesById = async (request, response) => {
  try {
    const { id } = request.params;
    const [rows] = await connection.query("CALL spGeRolesById(?)", [id]);
    const data = rows[0][0];
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener el Rol" });
  }
};

const createRole = async (request, response) => {
  try {
    const { id, name } = request.body;
    const [rows] = await connection.query("CALL spCreateRole(?,?)", [id, name]);
    response.status(201).json({
      "Rol creado con éxito": rows.affectedRows,
    });
  } catch (error) {
    response.status(500).json({ error: "Error al crear el Rol" });
  }
};

const updateRole = async (request, response) => {
  try {
    const { id } = request.params;
    const { name } = request.body;
    const [rows] = await connection.query("CALL spUpdateRole(?,?)", [id, name]);
    response
      .status(201)
      .json({ "Rol actualizado con éxito": rows.affectedRows });
  } catch (error) {
    response.status(500).json({ error: "Error al actualizar el Rol" });
  }
};

const deleteRole = async (request, response) => {
  try {
    const { id } = request.params;
    const [rows] = await connection.query("CALL spDeletRole(?)", [id]);
    response.sendStatus(204);
  } catch (error) {
    response.status(500).json({ error: "Error al eliminar el Rol" });
  }
};

export { getRoles, getRolesById, createRole, updateRole, deleteRole };
