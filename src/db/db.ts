import { User } from '../resources/models/user.model';
import {Task} from "../resources/models/task.model"
import {Board} from "../resources/models/board.model"

let users: Array<User> = [];
let boards: Array<Board> = [];
let tasks: Array<Task> = [];
let DB ={
  users,
  boards,
  tasks
};


export { DB };