import { HttpError } from './http-error';
import { Request, Response } from 'express';

const throwError = (res: Response, err: HttpError | Error) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode);
    res.send(err.message);
    res.end();
  } else if (err instanceof Error) {
    res.status(500)
    res.send(err.message)
    res.end()
  }
};

export { throwError };