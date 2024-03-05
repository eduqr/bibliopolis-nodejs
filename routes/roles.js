

const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
// conexión con la base de datos
const { connection } = require("../config/config.db");

const getRoles = (request, response) => {
    connection.query('SELECT * FROM roles',
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    })
}
app.route("/roles").get(getRoles);
module.exports = app;
