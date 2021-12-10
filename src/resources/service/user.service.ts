import { UsersRepo } from '../repo/user.repo';
import { throwError } from '../../errors';
import { Request, Response } from 'express';


class UsersService {
  static async getAll(req: Request, res: Response) {

    try {
      const users = await UsersRepo.getAll();
      res.status(200);
      res.send(users);
      res.end();
    } catch (err) {
      throwError(res, err as Error);
    }
  }

  static async getUserByID(req: Request, res: Response) {

    try {
      const { userId } = req.params;

      const user = await UsersRepo.getUserById(userId);

      res.status(200)
      res.send(user);
      res.end();
    } catch (err) {
      throwError(res, err as Error);
    }
  }

  static async createUser(req: Request, res: Response) {

    try {
      let requestBody: any = await req.body;

      let user = await UsersRepo.createUser(requestBody);

      res.status(201)
      res.send(user);
      res.end();
    } catch (err) {
      throwError(res, err as Error);
    }
  }

  static async updateUser(req: Request, res: Response) {

    try {
      const reqBody: any = await req.body;

      const user = await UsersRepo.updateUser(
        req.params.userId,
        reqBody
      );
      res.status(200)
      res.send(user);
      res.end();
    } catch (err) {
      throwError(res, err as Error);
    }
  }

  static async deleteUser(req: Request, res: Response) {

    try {
      await UsersRepo.deleteUser(req.params.userId);

      res.status(204)
      res.end();
    } catch (err) {
      throwError(res, err as Error);
    }
  }
}

export { UsersService };