import * as uuid from "uuid";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.model';
/**
 * The main model of user.
 */
@Entity()
class User {
  @PrimaryGeneratedColumn()
  id:string
  @Column("text")
  name:string|null
  @Column("string")
  login:string|null
  @Column("string")
  password:string|null
  @OneToMany(type => Task,task => task.columnId)
  tasks:Task[]|null

  constructor(name:string,login:string,password:string) {

    this.id = uuid.v4();
    this.name = name
    this.login = login
    this.password = password
    this.tasks =[]
  }

  static toResponse(user:User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export {User}