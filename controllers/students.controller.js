const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config/config.db");

const getStudents = (request, response) => response.send('gola')

const createStudent = (request, response) => {
    const {id, name, lastname, email, career_id} = request.body;
    connection.query('INSERT INTO students (id, name, lastname, email, career_id) VALUES (?,?,?,?,?)', 
    [id, name, lastname, email, career_id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({
            "Item añadido correctamente": results.affectedRows,
        });
    })
}

const updateStudent = (request, response) => response.send('hola update')
const deleteStudent = (request, response) => response.send('hola delete')

module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent
};