import { User } from '../../entities/user.model';

import { HttpError } from '../../errors';
import { getRepository } from 'typeorm';


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
 * return list of all users
 * @returns list of all users
 */
export const getAll = async (): Promise<User[]> => {
  const userRepository = await getRepository(User);
  return await userRepository.find({ where: {} });
};

/**
 * take user's ID and returns a user by ID
 * @param userId user's ID
 * @returns User by ID
 */
export const getUserById = async (userId: string): Promise<UserToResp | 'NOT_FOUND'> => {
  let userById: User | undefined;
  const userRepository = getRepository(User);
  try {
    userById = await userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .getOne();
  } catch (e) {
    throw new Error('Error into db (user creation)');
  }

  if (typeof userById === 'undefined') {
    throw new HttpError('There is no user with such id!', 404);
  }

  return User.toResponse(userById);
};

/**
 * take user's body and returns a created user
 * @param newUserBody new user's body
 * @returns created User
 */
export const createUser = async (newUserBody: User): Promise<UserToResp> => {
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
  const userRepository = getRepository(User);
  try {
    await userRepository
      .createQueryBuilder('user')
      .insert()
      .into(User)
      .values(userData)
      .execute();
  } catch (e) {
    throw new Error('Error into db (user creation)');
  }

  return User.toResponse(userData);
};

/**
 * take user's ID and user's body and returns a updated user
 * @param userId user's ID
 * @param body new user's body
 * @returns updated user
 */
export const updateUser = async (userId: string, body: tryBody): Promise<UserToResp> => {
  if (!body.name && !body.login && !body.password) {
    throw new HttpError('Please enter you valid changes.', 409);
  }
  const userRepository = getRepository(User);
  const res = await userRepository.findOne(userId);
  if (res === undefined) throw new HttpError('There are no user with such id!', 404);
  const updatedRes = await userRepository.update(userId,body);
  return updatedRes.raw;
};

/**
 * take user's ID.Make for tasks parameter userID = null and returns a deleted user
 * @param id user's ID
 * @returns deleted user
 */

export const deleteUser = async (id: string): Promise<UserToResp> => {
  const userRepository = getRepository(User);
  const deletedRes = await userRepository.delete(id);

  if (deletedRes.affected) return User.toResponse(deletedRes.raw)
  else throw new HttpError('There are no user with such id!', 404);
};


