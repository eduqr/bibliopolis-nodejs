const express = require("express");
const app     = express();
const {getStudents, createStudent, updateStudent, deleteStudent} = require("../controllers/students.controller")

// const dotenv = require("dotenv");
// dotenv.config();

// const {connection} = require("../config/config.db");


app.route("/estudiantes").get(getStudents);
app.route("/estudiantes").post(createStudent);
app.route("/estudiantes").put(updateStudent);
app.route("/estudiantes").delete(deleteStudent);

module.exports = app;