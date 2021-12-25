import { HttpError } from './http-error';
import { Request, Response } from 'express';
import { CustomLogger } from '../logger/logger';
/**
 * Make custom response by Error
 * @param req Request
 * @param res Response
 * @param err Error
 */
const throwError = (req: Request,res: Response, err:Error) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode);
    res.send(err.message);
    CustomLogger.createLog(req,err.statusCode)
    res.end();
  } else {
    res.status(404)
    res.send(err.message)
    CustomLogger.createLog(req,404)
    res.end()
  }
};

export { throwError };