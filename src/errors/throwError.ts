import { HttpError } from './http-error';
import { Response } from 'express';

const throwError = (res: Response, err:any) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode);
    res.send(err.message);
    res.end();
  } else {
    console.log(err)
    res.status(404)
    res.send(err.message)
    res.end()
  }
};

export { throwError };