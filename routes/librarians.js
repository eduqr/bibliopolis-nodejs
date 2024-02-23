const express = require("express");
const Router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
// conexión con la base de datos
const { connection } = require("../config/config.db");

const getLibrarian = (request, response) => {
    connection.query("SELECT * FROM librarians",
    (error, results) => {
        if (error)
            throw error;
        response.status(200).json(results);
    });
};
Router.get("/Bibliotecarios", getLibrarian);

const postLibrarian = (request, response) => {
    const { name, lastname, email, rol_id } = request.body;
    connection.query("INSERT INTO librarians (name, lastname, email, rol_id) VALUES (?,?,?,?)",
    [name, lastname, email, rol_id],
    (error, results) => {
        if (error)
            throw error;
        response.status(201).json({"Item añadido correctamente": results.affectedRows});
    });
};

Router.route("/Bibliotecarios").post(postLibrarian);

const updateLibrarian = (request, response) => {
    const librarianId = request.params.id;
    const { name, lastname, email, rol_id } = request.body;
    connection.query("UPDATE librarians SET name = ?, lastname = ?, email = ?, rol_id = ? WHERE id = ?",
    [name, lastname, email, rol_id, librarianId],
    (error, results) => {
        if (error)
            throw error;
        response.status(200).json({"Item Actualizado correctamente": results.affectedRows});
    });
};

Router.route("/bibliotecarios/:id").post(updateLibrarian);

const deleteLibrarian = (request, response) => {
    const id = request.params.id;
    connection.query(
        "DELETE FROM librarians WHERE id = ?",
        [id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json({"Item Eliminado correctamente": results.affectedRows});
        }
    );
};

Router.route("/bibliotecarios/:id").delete(deleteLibrarian);

module.exports = Router;
