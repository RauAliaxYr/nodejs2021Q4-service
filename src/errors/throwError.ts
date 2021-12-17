import { HttpError } from './http-error';
import { Response } from 'express';
/**
 * Make custom response by Error
 * @param res Response
 * @param err Error
 */
const throwError = (res: Response, err:Error) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode);
    res.send(err.message);
    res.end();
  } else {
    res.status(404)
    res.send(err.message)
    res.end()
  }
};

export { throwError };