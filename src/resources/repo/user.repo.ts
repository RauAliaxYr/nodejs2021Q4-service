import { User } from '../models/user.model';
import { DB } from '../../db/db';

import { HttpError } from '../../errors';
import { Task } from '../models/task.model';

type UserToResp = {
  id: string,
  name: string|null
  login: string|null
}
type tryBody ={
  name:string,
  login:string,
  password:string
}

/**
 * The main repository API for users.
 */
class UsersRepo {
  /**
   * return list of all users
   * @returns list of all users
   */
  static getAll(): Array<UserToResp> {
    return DB.users.map((user) => User.toResponse(user));
  }
  /**
   * take user's ID and returns a user by ID
   * @param userId user's ID
   * @returns User by ID
   */
  static getUserById(userId:string): UserToResp {
    const userData: User = DB.users.filter((user:User) => user.id === userId)[0];

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
  static createUser(newUserBody:User):UserToResp {
    if (!newUserBody.name) {
      throw new HttpError('Please enter the name.', 405);
    }

    if (!newUserBody.login) {
      throw new HttpError('Please enter the login.', 405);
    }

    if (!newUserBody.password) {
      throw new HttpError('Please enter the password.', 405);
    }

    const userData:User = new User(newUserBody.name ,newUserBody.login,newUserBody.password);

    DB.users.push(userData);

    return User.toResponse(userData);
  }
  /**
   * take user's ID and user's body and returns a updated user
   * @param userId user's ID
   * @param body new user's body
   * @returns updated user
   */
  static updateUser(userId:string, body:tryBody):UserToResp{
    if (!body.name && !body.login && !body.password) {
      throw new HttpError('Please enter you valid changes.', 409);
    }

    const newUserParams:User = {id: userId, name :'',login:'',password:''}

    if (body.name) {
      newUserParams.name = body.name;
    }
    if (body.login) {
      newUserParams.login = body.login;
    }
    if (body.password) {
      newUserParams.password = body.password;
    }

    const userData:User|undefined = DB.users.find((user:User) => user.id === newUserParams.id); // !

    if (!userData) throw new HttpError('There are no user with such id!', 404);

    const userIndex:number = DB.users.indexOf(userData);
    DB.users[userIndex] = { ...userData, ...newUserParams };

    return User.toResponse(DB.users[userIndex]);
  }
  /**
   * take user's ID.Make for tasks parameter userID = null and returns a deleted user
   * @param userId user's ID
   * @returns deleted user
   */
  static deleteUser(userId:string):UserToResp {
    const userFind:User|undefined = DB.users.find((user) => user.id === userId);

    if (!userFind) throw new HttpError('There are no user with such id!', 404);

    DB.users = DB.users.filter((user:User) => user.id !== userId);

    DB.tasks.forEach((task:Task, index:number) => {
      if (task.userId === userId) DB.tasks[index].userId = null;
    });

    return User.toResponse(userFind);
  }
}

export {
  UsersRepo
};