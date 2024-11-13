import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

let connection;
try {
  connection = await mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    //port: process.env.PORT,
    multipleStatements: true,
  });
  console.log("Conexión exitosa a la base de datos");
} catch (error) {
  console.error("Error al conectar con la base de datos:", process.env.DBNAME);
}

export { connection };
