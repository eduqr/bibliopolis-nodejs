const express = require("express");
const app     = express();

const dotenv = require("dotenv");
dotenv.config();

// Conexión con la DB
const {connection} = require("../config/config.db");

const getLoans = (request, response) => {
    connection.query("SELECT * FROM loans",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

// Ruta
app.route("/prestamos").get(getLoans);

module.exports = app;