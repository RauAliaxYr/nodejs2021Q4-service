import { User } from '../resources/models/user.model';
import {Task} from "../resources/models/task.model"
import {Board} from "../resources/models/board.model"

const users: Array<User> = [];
const boards: Array<Board> = [];
const tasks: Array<Task> = [];
const DB ={
  users,
  boards,
  tasks
};


export { DB };