import { HttpError } from './http-error';
import { Request, Response } from 'express';
import { CustomLogger } from '../logger/logger';


/**
 * Make custom response by UncaughtError
 * @param err Error
 */
const throwUncaughtException = (err: Error) => {
CustomLogger.uncaughtExceptionLog(err)
};
/**
 * Make custom response by Error
 * @param req Request
 * @param res Response
 * @param err Error
 */
const throwError = (req: Request, res: Response, err: Error) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode);
    CustomLogger.errorLog(req, err.statusCode, err);
    res.send(err.message);
    res.end();
  } else {
    res.status(404);
    CustomLogger.errorLog(req, 404, err);
    res.send(err.message);

    res.end();
  }
};

export { throwError, throwUncaughtException };