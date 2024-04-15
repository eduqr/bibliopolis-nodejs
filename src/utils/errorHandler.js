import { StatusCode } from "./httpStatus.js";

class ConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.httpCode = StatusCode.SERVER_UNAVAILABLE;
    this.description = "Ocurrió un problema en la conexión con la DB";
  }
}

class ValidationError extends Error {
  constructor(message, data, field) {
    super(message);
    this.data = data;
    this.name = this.constructor.name;
    this.httpCode = StatusCode.BAD_REQUEST;
    this.field = field;
    this.description = "La entrada proporcionada no es adecuada";
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.httpCode = StatusCode.INTERNAL_SERVER;
    this.description = "Error interno en el servidor";
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.httpCode = StatusCode.UNAUTHORIZED;
    this.description = "Credenciales incorrectas";
  }
}

class NotFoundError extends Error {
  constructor(message, data) {
    super(message);
    this.data = data;
    this.name = this.constructor.name;
    this.httpCode = StatusCode.NOT_FOUND;
    this.description = "No se encontró el recurso solicitado";
  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.httpCode = StatusCode.FORBIDDEN;
    this.description = "No autorizado para acceder al recurso";
  }
}
// Esta idea puede servir para otra cosa
// const errorType = error.constructor.name;
// const errorMessage = await errors.getErrorMessage(errorType, "students");
// await errors.sendError(error, response, errorMessage);
//
// async function getErrorMessage(errorType, context) {
//   const errorMessages = {
//     ConnectionError: {
//       default: "Conexión con el servidor interrumpida",
//     },
//     ValidationError: {
//       default: "El dato no es adecuado",
//     },
//     NotFoundError: {},
//     AuthenticationError: {},
//     AuthorizationError: {},
//     InternalServerError: {
//       default: "Ocurrió un error inesperado en el servidor x.x",
//     },
//   };
//   return (
//     errorMessages[errorType]?.[context] ||
//     errorMessages[errorType]?.default ||
//     "Por favor reporta este error a soporte técnico"
//   );
// }

async function sendError(error, response, data = null, field = null) {
  const dataToSend = error.data ? error.data : data;
  const fieldToSend = error.field ? error.field : field;
  const statusToSend = error.httpCode ? error.httpCode : 500;

  response.status(statusToSend).json({
    error: error.name,
    message: error.message,
    data: dataToSend,
    field: fieldToSend,
  });
}

const errors = {
  ConnectionError,
  ValidationError,
  InternalServerError,
  AuthenticationError,
  NotFoundError,
  AuthorizationError,
};

export { errors, sendError };
