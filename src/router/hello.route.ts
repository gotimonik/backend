import { NextFunction, Request, Response } from 'express';
import { sayHelloFromQuery, sayHelloFromRequestBody, sayHelloFromURL } from '../handler/hello.handler';
import HttpRequestContext from '../shared/http/http-request-context';
import responseBuilder from '../helper/response-builder';
import HelloResponse from '../model/hello/hello-response-body';

export default [
  {
    /**
     * @swagger
     *
     * /api/v1/hello:
     *   get:
     *     tags:
     *      - WithQueryParams
     *     description: Says Hello
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: name
     *         description: Name of the Person.
     *         in: query
     *         schema:
     *          type : string
     *          required: true
     *          example: World
     *     responses:
     *       200:
     *         description: Ok
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Internal Server Error
     */
    requestPath: `/hello`,
    method: 'GET',
    handler: (req: Request, res: Response, next: NextFunction): void => {
      const result: HelloResponse = sayHelloFromQuery(new HttpRequestContext(req, res, next));
      responseBuilder.successResponse(res, result);
    },
  },
  {
    /**
     * @swagger
     *
     * /api/v1/hello/{name}:
     *   get:
     *     tags:
     *      - WithURLParameters
     *     description: Says Hello
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: name
     *         description: Name of the Person.
     *         in: path
     *         schema:
     *          type : string
     *          required: true
     *          example: World
     *     responses:
     *       200:
     *         description: Ok
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Internal Server Error
     */
    requestPath: `/hello/:name`,
    method: 'GET',
    handler: (req: Request, res: Response, next: NextFunction): void => {
      const result: HelloResponse = sayHelloFromURL(new HttpRequestContext(req, res, next));
      responseBuilder.successResponse(res, result);
    },
  },
  {
    /**
     * @swagger
     *
     * /api/v1/hello:
     *   post:
     *     tags:
     *      - WithRequestBody
     *     description: Says Hello
     *     produces:
     *       - application/json
     *     requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                name:
     *                  type: string
     *              required:
     *                - name
     *              example:
     *                name: World
     *     responses:
     *       200:
     *         description: Ok
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Internal Server Error
     */
    requestPath: `/hello`,
    method: 'POST',
    handler: (req: Request, res: Response, next: NextFunction): void => {
      const result: HelloResponse = sayHelloFromRequestBody(new HttpRequestContext(req, res, next));
      responseBuilder.successResponse(res, result);
    },
  },
];
