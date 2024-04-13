import { StatusCode } from "./httpStatus.js";

class ConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.httpCode = StatusCode.SERVER_UNAVAILABLE;
    this.description = "Conexión con el servidor interrumpida";
  }
}

class ValidationError extends Error {
  constructor(data, message, field) {
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
    this.description = "Ocurrió un error inesperado en el servidor x.x";
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
  constructor(message) {
    super(message);
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

const errors = {
  ConnectionError,
  ValidationError,
  InternalServerError,
  AuthenticationError,
  NotFoundError,
  AuthorizationError,
};

export { errors };
