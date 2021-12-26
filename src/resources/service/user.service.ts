import { UsersRepo } from '../repo/user.repo';
import { throwError } from '../../errors';
import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { CustomLogger } from '../../logger/logger';


type tryBody = {
  name: string,
  login: string,
  password: string
}

type UserToResp = {
  id: string,
  name: string | null
  login: string | null
}

/**
 * The main service for users.
 */
class UsersService {
  /**
   * handles a GET request and make return response with a list of all users
   * @param req GET Request
   * @param res GET Response
   */
  static async getAll(req: Request, res: Response) {

    try {
      const users = await UsersRepo.getAll();
      res.status(200);
      res.send(users);
      CustomLogger.infoLog(req, 200);
      res.end();
    } catch (err) {
      throwError(req, res, err as Error);
    }
  }

  /**
   * handles a GET request and make return response with a user by id
   * @param req GET Request
   * @param res GET Response
   */
  static async getUserByID(req: Request, res: Response) {

    try {
      const { userId } = req.params;

      const user = await UsersRepo.getUserById(userId);

      res.status(200);
      res.send(user);
      CustomLogger.infoLog(req, 200);
      res.end();
    } catch (err) {
      throwError(req, res, err as Error);
    }
  }

  /**
   * handles a POST request and make return response with a created user
   * @param req POST Request
   * @param res POST Response
   */
  static async createUser(req: Request, res: Response) {

    try {
      const requestBody: User = await req.body;

      const user = await UsersRepo.createUser(requestBody);

      res.status(201);
      res.send(user);
      CustomLogger.infoLog(req, 201);
      res.end();
    } catch (err) {
      throwError(req, res, err as Error);
    }
  }

  /**
   * handles a PUT request and make return response with a updated user
   * @param req PUT Request
   * @param res PUT Response
   */
  static async updateUser(req: Request, res: Response) {

    try {
      const reqBody: tryBody = await req.body;

      const user: UserToResp = await UsersRepo.updateUser(
        req.params.userId,
        reqBody
      );
      res.status(200);
      res.send(user);
      CustomLogger.infoLog(req, 200);
      res.end();
    } catch (err) {
      throwError(req, res, err as Error);
    }
  }

  /**
   * handles a DELETE request and make return response with status 204
   * @param req DELETE Request
   * @param res DELETE Response
   */
  static async deleteUser(req: Request, res: Response) {

    try {
      await UsersRepo.deleteUser(req.params.userId);

      res.status(204);
      CustomLogger.infoLog(req, 204);
      res.end();
    } catch (err) {
      throwError(req, res, err as Error);
    }
  }
}

export { UsersService };