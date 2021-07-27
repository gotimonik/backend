import bodyParser from 'body-parser';
import cls from 'cls-hooked';
import express from 'express';
import * as http from 'http';
import cors from 'cors';
import methodOverride from 'method-override';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import config from './config';
import { errorHandler } from './middleware';
import correlation, { CORRELATOR_NAMESPACE } from './middleware/correlator';
import { router } from './router';

const app = express();

// Some sauce that always add since 2014
// "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
// Maybe not needed anymore ?
app.use(correlation(cls.createNamespace(CORRELATOR_NAMESPACE)));

app.use(methodOverride());

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

// Middleware that transforms the raw string of req.body into json
app.use(bodyParser.json());

// Configure Swagger-JSDoc
const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0'),
    basePath: '/',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    schemes: ['http', 'https'],
    host: 'localhost:8080',
    produces: ['application/json'],
    info: {
      title: 'Stories API AppEngine', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: [__filename, `${path.resolve(__dirname, './')}/router/**/*.route.js`],
};
export const swaggerSpec = swaggerJSDoc(options);
// Configure Swagger UI
app.use('/api-docs/', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));

app.get('/_ah/warmup', (_req, res) => {
  // We don't have anything yet to initialize for instances.
  console.info('Warmup request recieved');
  res.sendStatus(200).end();
});

// Configure Application routes
app.use(config.gae.api.prefix, router);

// Error Handling
app.use(errorHandler);

export default app;

async function startServer(): Promise<http.Server> {
  // Start the Application
  return app.listen(parseInt(process.env.PORT || '8081', 10), (): void => {
    // Handle this below.
  });
}

startServer()
  .then((): void => {
    console.info(`#############################################################`);
    // Enable below 2 lines to see the environment
    console.debug(`🛡️                   Environment                           🛡️ `);
    console.debug(JSON.stringify(config, null, 2));
    console.info(`🛡️         Application Started Successfully!!              🛡️ `);
    console.info(`#############################################################`);
  })
  .catch((err): void => {
    console.error(`#############################################################`);
    console.error(`⚠️  Failed to Start Application: Error ⚠️ `);
    console.error(JSON.stringify(err));
    console.error(`#############################################################`);
  });
