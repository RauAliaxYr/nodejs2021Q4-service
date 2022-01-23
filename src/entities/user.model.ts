import { v4 as uuid } from 'uuid'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { JWT_SECRET_KEY } from '../common/config';


export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}
export type UserToResp = {
  id: string,
  name: string | null
  login: string | null
}

/**
 * The main model of user.
 */
@Entity({name: 'user'})
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar' )
  name: string;

  @Column('varchar')
  login: string;

  @Column('varchar')
  password: string;

  /**
   * User constructor.
   * @param id - instance id
   * @param name - user name
   * @param login - login
   * @param password - password
   */
  constructor({
                id = uuid(),
                name = 'USER',
                login = 'user',
                password = 'P@55w0rd'
              } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Return user data without password
   * @param user - User instance
   * @returns Return user identifier, name and login
   */
  static toResponse(user: IUser): UserToResp {
    const { id, name, login } = user;
    return { id, name, login };
  }


  generateToken() {
    return jwt.sign({ usedId: this.id, login: this.login }, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
  }

  passwordsMatch(password: string) {
    if (!this.password) {
      return false;
    }
    return bcrypt.compareSync(password, this.password);
  }
}

