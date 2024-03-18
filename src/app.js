import express from "express";
import cors from "cors";
import loansRouter from "./routes/loans.routes.js";
import careersRouter from "./routes/careers.routes.js";
import rolesRouter from "./routes/roles.routes.js";
import studentsRouter from "./routes/students.routes.js";
import librariansRouter from "./routes/librarians.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(loansRouter);
app.use(careersRouter);
app.use(rolesRouter);
app.use(studentsRouter);
app.use(librariansRouter);

export default app;
