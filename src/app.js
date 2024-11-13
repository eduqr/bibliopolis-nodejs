import express, { request, response } from "express";
import cors from "cors";
import loansRouter from "./routes/loans.routes.js";
import careersRouter from "./routes/careers.routes.js";
import rolesRouter from "./routes/roles.routes.js";
import studentsRouter from "./routes/students.routes.js";
import librariansRouter from "./routes/librarians.routes.js";
import BooksRouter from "./routes/books.routes.js";
import editorialRouter from "./routes/editorial.routes.js";
import emailRouter from "./routes/email.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(loansRouter);
app.use(careersRouter);
app.use(rolesRouter);
app.use(studentsRouter);
app.use(librariansRouter);
app.use(BooksRouter);
app.use(editorialRouter);
app.use(emailRouter);
app.use("/uploads", express.static("uploads"));

app.use((request, response, next) => {
  response.status(404).json({
    message: "Intenta con alguna de estas rutas:",
    availableRoutes: [
      {
        students: "/estudiantes",
      },
      {
        careers: "/carreras",
      },
      {
        books: "/libros",
      },
      {
        editorials: "/editorial",
      },
      {
        librarians: "/bibliotecarios",
      },
      {
        roles: "/roles",
      },
    ],
    reminder:
      "Puedes usar Postman o algún programa similar para agregar elementos",
    disclaimer:
      "Todos los datos son ficticios y se utilizan únicamente con fines demostrativos",
  });
});

export default app;
