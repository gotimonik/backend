import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const GCP = process.env.PROJECT;
const APPNAME = process.env.APPLICATION;

const options = {
  definition: {
    openapi: '3.0.0',
    basePath: '/',
    schemes: ['https'],
    host: GCP ? `${APPNAME}-dot-${GCP}.uc.r.appspot.com` : 'localhost:8080',
    produces: ['application/json'],
    info: {
      title: 'Backend Sample',
      version: '1.0.0',
    },
  },
  // Path to the API docs
  apis: [`${process.cwd()}/**/*.ts`],
};

const swaggerSpec = swaggerJSDoc(options);

const router = express.Router();

/**
 * @swagger
 *
 * /api-docs.json:
 *   get:
 *     tags:
 *      - Swagger
 *     description: Get the Swagger JSON
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *       500:
 *         description: Internal Server Error
 */
router.get('/api-docs.json', (req, res): void => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Configure Swagger UI
router.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));

export default router;
