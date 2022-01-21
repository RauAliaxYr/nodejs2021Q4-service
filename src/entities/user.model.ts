import * as uuid from "uuid";
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * The main model of user.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id:string
  @Column("varchar")
  name:string
  @Column("varchar")
  login:string
  @Column("varchar")
  password:string

  constructor(name:string,login:string,password:string) {

    this.id = uuid.v4();
    this.name = name
    this.login = login
    this.password = password
  }

  static toResponse(user:User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

