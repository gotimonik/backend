import cls, { Namespace } from 'cls-hooked';
import { NextFunction, Request, Response } from 'express';
import shortid from 'shortid';

export const CORRELATOR_NAMESPACE = 'CORRELATOR';
/**
 * This correlator creates a namespace for each request which gets passed down the chain in express.
 * Allowing us to trace all logging through the flow the a correlator shortid set when request is received.
 */
function correlator(namespace: Namespace): (req: Request, res: Response, next: NextFunction) => void {
  if (!namespace) throw new Error('CLS namespace required');
  return function clsifyMiddleware(req: Request, res: Response, next: NextFunction): void {
    namespace.bindEmitter(req);
    namespace.bindEmitter(res);
    namespace.run((): void => {
      const correlationId = shortid.generate();
      const corrNamespace = cls.getNamespace(CORRELATOR_NAMESPACE);
      if (corrNamespace) corrNamespace.set('correlationId', correlationId);
      next();
    });
  };
}
export default correlator;
