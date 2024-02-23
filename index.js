const express = require("express");
const app     = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cargar archivo de rutas
app.use(require('./routes/loans'));
app.use(require('./routes/students.routes.js'));
const PORT = process.env.PORT;

app.listen(PORT,() => {
  console.log(`El servidor escucha en el puerto `+ PORT);
});

module.exports = app;