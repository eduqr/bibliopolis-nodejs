import { StatusCode } from "./httpStatus.js";

class ConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.httpCode = StatusCode.SERVER_UNAVAILABLE;
    this.description = "No se pudo establecer una conexión con el servidor";
  }
}

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
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
    this.description = "No autorizado para acceder a este recurso";
  }
}

export {
  ConnectionError,
  ValidationError,
  InternalServerError,
  AuthenticationError,
  NotFoundError,
  AuthorizationError,
};
