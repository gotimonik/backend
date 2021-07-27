import { ErrorRequestHandler } from 'express';
import { GeneralError } from '../model/errors';

/**
 To be used with general error models - src/model/errors.ts
 */
const handleError: ErrorRequestHandler = (err, req, res) => {
  console.error(err);
  return res.status(err instanceof GeneralError ? err.getCode() : 500).json({
    status: 'error',
    message: err.message,
  });
};

export default handleError;
