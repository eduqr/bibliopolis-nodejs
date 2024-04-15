import { connection } from "../../config/config.js";
import { errors } from "../errorHandler.js";

async function DBConnection() {
  try {
    await connection.query("SELECT 1");
  } catch (error) {
    throw new errors.ConnectionError("Conexión con el servidor interrumpida");
  }
}

async function dataExists(data) {
  if (typeof data === "string") {
    return data.trim() !== "";
  }
  return !!data;
}

async function isNumber(number) {
  if (isNaN(number) || number === "") {
    return false;
  }
}

async function checkLength(data, minLength, maxLength) {
  const dataLength = data.length;
  return dataLength >= minLength && dataLength <= maxLength;
}

async function checkNumberRange(number, min, max) {
  return number >= min && number <= max;
}

async function checkEmail(email) {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|upqroo\.edu\.mx)$/;
  return emailRegex.test(email);
}

// Aún no se usa esta
async function deleteWhiteSpaces(string) {
  return string.replace(/^\s+|\s+$/g, "");
}

const validate = {
  DBConnection,
  dataExists,
  isNumber,
  checkLength,
  checkNumberRange,
  checkEmail,
  deleteWhiteSpaces,
};

export { validate };
