import { connection } from "../config/config.js";
import {
  ConnectionError,
  ValidationError,
  InternalServerError,
  AuthenticationError,
  NotFoundError,
  AuthorizationError,
} from "./errorHandler.js";

async function validateConnection() {
  try {
    const [rows] = await connection.query("SELECT 1");
  } catch (error) {
    throw new ConnectionError();
  }
}

export { validateConnection };
