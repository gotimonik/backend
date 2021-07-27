import { NextFunction, Request, Response } from 'express';
import getPracticesHandler from '../handler/practices.handler';
import responseBuilder from '../helper/response-builder';
import { errorHandler } from '../middleware';
import HttpRequestContext from '../shared/http/http-request-context';

export default [
  {
    /**
     * @swagger
     *
     * /api/v1/practices:
     *   get:
     *     tags:
     *      - Practitioner practices
     *     description: Get the general practitioner practices.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: offset
     *         description: Specifies offset value
     *         in: query
     *         schema:
     *          type : number
     *          required: false
     *          example: '0'
     *       - name: limit
     *         description: Specifies limit value
     *         in: query
     *         schema:
     *          type : number
     *          required: false
     *          example: 10
     *     responses:
     *       200:
     *         description: Ok
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Internal Server Error
     */
    requestPath: `/practices`,
    method: 'GET',
    handler: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const result = await getPracticesHandler(new HttpRequestContext(req, res, next));
        responseBuilder.successResponse(res, result);
      } catch (error) {
        errorHandler(error, req, res, next);
      }
    },
  },
];
