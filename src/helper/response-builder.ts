import { Response } from 'express';
import { constants } from 'http2';
import HTTPSuccessResponse from '../shared/http/http-200-success';
import HTTPClientError from '../shared/http/http-client-error';

class ResponseBuilder {
  public readonly statusCode_OK: number = constants.HTTP_STATUS_OK;

  public readonly statusCode_500: number = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;

  public successResponse(resp: Response, data: HTTPSuccessResponse): Response {
    return resp.status(this.statusCode_OK).header('content-type', 'application/json').send(data);
  }

  public errorResponse(resp: Response, error: HTTPClientError): Response {
    return resp
      .status(error.statusCode || this.statusCode_500)
      .header('content-type', 'application/json')
      .send(error);
  }
}

const responseBuilder = new ResponseBuilder();

export default responseBuilder;
