/* eslint-disable */

/**
 * Error type that allows wrapping an existing error with custom message.
 * The winston logger will detect this error and print the 'caused by' stack.
 * Wrapping the actual error will allow us to send a custom message from endpoint rather than the caused by error.
 */
export class GeneralError extends Error {
  error?: Error;

  constructor(message: string, error?: Error) {
    super();
    this.message = message;
    this.error = error;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    return 500;
  }

  getError() {
    return this.error;
  }
}

export class BadRequest extends GeneralError {}
export class NotFound extends GeneralError {}
export class ServerError extends GeneralError {}
