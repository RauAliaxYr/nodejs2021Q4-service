import { User } from '../resources/models/user.model';

let users: Array<User> = [];
let boards: Array<User> = [];
let tasks: Array<User> = [];
let DB ={
  users,
  boards,
  tasks
};


export { DB };