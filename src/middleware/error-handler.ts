import { NextFunction, Request, Response } from 'express';
import responseBuilder from '../helper/response-builder';
import HTTPClientError from '../shared/http/http-client-error';
import HTTP500Error from '../shared/http/http-500-error';

export default (error: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(`${error.stack}`);
  const httpClientError: HTTPClientError =
    error instanceof HTTPClientError ? error : new HTTP500Error(error.message, error.stack);
  if (res.headersSent) {
    next(error);
  }
  responseBuilder.errorResponse(res, httpClientError);
};
