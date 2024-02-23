const express = require("express");
const app     = express();
const {getStudents, createStudent, updateStudent, deleteStudent} = require("../controllers/students.controller")


app.route("/estudiantes").get(getStudents);
app.route("/estudiantes").post(createStudent);
app.route("/estudiantes").put(updateStudent);
app.route("/estudiantes").delete(deleteStudent);

module.exports = app;