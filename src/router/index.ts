import { Router } from 'express';
import helloRoutes from './hello.route';
import practicesRoutes from './practices.route';

export const router = Router();

const routesList = [...helloRoutes, ...practicesRoutes];

routesList.forEach((route): void => {
  const { method, requestPath, handler } = route;
  switch (method) {
    case 'get':
    case 'GET':
      router.get(`${requestPath}`, handler);
      console.debug(`Setup Route=> ${method}:${requestPath}`);
      break;
    case 'post':
    case 'POST':
      router.post(`${requestPath}`, handler);
      console.debug(`Setup Route=> ${method}:${requestPath}`);
      break;
    case 'put':
    case 'PUT':
      router.put(`${requestPath}`, handler);
      console.debug(`Setup Route=> ${method}:${requestPath}`);
      break;
    case 'delete':
    case 'DELETE':
      router.delete(`${requestPath}`, handler);
      console.debug(`Setup Route=> ${method}:${requestPath}`);
      break;
    case 'head':
    case 'HEAD':
      router.head(`${requestPath}`, handler);
      console.debug(`Setup Route=> ${method}:${requestPath}`);
      break;
    default:
  }
});

export default { router };
