import { User } from '../models/user.model';
import { DB } from '../../db/db';

import { HttpError } from '../../errors';
import { Task } from '../models/task.model';
import { getManager, UpdateResult } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

type UserToResp = {
  id: string,
  name: string | null
  login: string | null
}
type tryBody = {
  name: string,
  login: string,
  password: string
}

/**
 * The main repository API for users.
 */
class UsersRepo {

  static UserRepo = getManager().getRepository(User);

  /**
   * return list of all users
   * @returns list of all users
   */
  static async getAll(): Promise<Repository<User>> {
    return this.UserRepo;
  }

  /**
   * take user's ID and returns a user by ID
   * @param userId user's ID
   * @returns User by ID
   */
  static async getUserById(userId: string): Promise<UserToResp> {
    const userData: User | undefined = await this.UserRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!userData) {
      throw new HttpError('There is no user with such id!', 404);
    }
    return User.toResponse(userData);
  }

  /**
   * take user's body and returns a created user
   * @param newUserBody new user's body
   * @returns created User
   */
  static async createUser(newUserBody: User): Promise<UserToResp> {
    if (!newUserBody.name) {
      throw new HttpError('Please enter the name.', 405);
    }

    if (!newUserBody.login) {
      throw new HttpError('Please enter the login.', 405);
    }

    if (!newUserBody.password) {
      throw new HttpError('Please enter the password.', 405);
    }

    const userData: User = new User(newUserBody.name, newUserBody.login, newUserBody.password);

    try {
      await this.UserRepo
        .createQueryBuilder('user')
        .insert()
        .into(User)
        .values(userData)
        .execute();
    } catch (e) {
      throw new Error('Error into db (user creation)');
    }

    return User.toResponse(userData);
  }

  /**
   * take user's ID and user's body and returns a updated user
   * @param userId user's ID
   * @param body new user's body
   * @returns updated user
   */
  static async updateUser(userId: string, body: tryBody): Promise<UserToResp> {
    if (!body.name && !body.login && !body.password) {
      throw new HttpError('Please enter you valid changes.', 409);
    }

    try {
      await this.UserRepo
        .createQueryBuilder()
        .update(User)
        .set({ name: body.name, login: body.login, password: body.password })
        .where('user.id = :id', { id: userId })
        .returning('*')
        .execute();
    } catch (e) {
      throw new Error('Error into db (user updation)');
    }

    const UserToResponse: User | undefined = await this.UserRepo
      .createQueryBuilder()
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!UserToResponse) {
      throw new HttpError('There are no user with such id!', 404);
    } else return User.toResponse(UserToResponse);
  }

  /**
   * take user's ID.Make for tasks parameter userID = null and returns a deleted user
   * @param userId user's ID
   * @returns deleted user
   */
  static async deleteUser(userId: string): Promise<UserToResp> {
    const UserToResponse: User | undefined = await this.UserRepo
      .createQueryBuilder()
      .where('user.id = :id', { id: userId })
      .getOne();
    if (!UserToResponse) throw new HttpError('There are no user with such id!', 404);

    try {
      await this.UserRepo
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('user.id = :id', { id: userId })
        .execute()
    }
    catch (e) {
      throw new Error('Error into db (user deletion)');
    }

    try {
      await getManager().getRepository(Task)
        .createQueryBuilder()
        .update()
        .set({userId: null})
        .where('user.id = :id', { id: userId })
        .execute()

    }catch (e) {
      throw new Error('Error into db (task deletion)');
    }

    return User.toResponse(UserToResponse);
  }
}

export {
  UsersRepo
};