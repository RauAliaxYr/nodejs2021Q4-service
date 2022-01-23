import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { JWT_SECRET_KEY } from '../common/config';

export function isAuthorized(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res
      .status(401)
      .send({ message: 'Authorization header is required' });
  } else {
    const token = authHeader.split(' ')[1];
    if (!authHeader.startsWith('Bearer ') || !token) {
      res.status(401).send({ message: 'Unauthorized' });
    } else {
      try {
        jwt.verify(token, JWT_SECRET_KEY);
        next();
      } catch (error) {
        res
          .status(401)
          .send({ message: 'Token is not valid' });
      }
    }
  }
}