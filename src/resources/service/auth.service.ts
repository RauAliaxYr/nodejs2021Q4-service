import { Request, Response } from 'express';
import { User } from '../../entities/user.model';
import { throwError } from '../../errors';
import { getRepository } from 'typeorm';


async function login(req: Request, res: Response): Promise<void> {
  const userRepo = getRepository(User)
  try {
    const user = await userRepo.findOne({ login: req.body.login });
    if (user) {
      const token = user.generateToken();
      res.json({ token });

    } else {
      res.status(403).send({ message: 'User not found' });
    }
  } catch (error) {
    throwError(req,res, error as Error);
  }
}

export { login };