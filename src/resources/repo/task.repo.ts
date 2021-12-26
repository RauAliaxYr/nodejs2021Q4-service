import { Task } from '../models/task.model';
import { Board } from '../models/board.model';
import { BoardRepo } from './board.repo';
import { DB } from '../../db/db';

import { HttpError } from '../../errors';

type TaskBody = {
  title: string,
  order: string|number,
  description: string,
  userId: string|null,
  boardId: string|null,
  columnId: string|null

}
/**
 * The main repository API for tasks.
 */
class TaskRepo {
  /**
   * return list of all tasks
   * @returns list of all tasks
   */
  static All(): Array<Task> {

    return DB.tasks;
  }
  /**
   * take board's ID and returns all tasks by board ID
   * @param boardId board's ID
   * @returns board by ID
   */
  static getTasksById(boardId: string): Array<Task> {
    const board: Board = BoardRepo.getBoardById(boardId);
    const filteredByBoardIdTasks: Array<Task> = DB.tasks.filter((task: Task) => task.boardId === boardId);

    if (filteredByBoardIdTasks.length === 0) {
      throw new HttpError(`There are no tasks on ${board.title} board.`, 404);
    }
    return filteredByBoardIdTasks;
  }
  /**
   * take board's ID and returns all tasks by board ID
   * @param boardId board ID
   * @param taskId tasks ID
   * @returns task by board and task ID
   */
  static getTaskById(boardId: string, taskId: string): Task {
    const board: Board = BoardRepo.getBoardById(boardId);
    const filteredByBoardIdTasks: Array<Task> = DB.tasks.filter((task: Task) => task.boardId === boardId);
    const taskByBoardIdAndTaskId: Task = filteredByBoardIdTasks.filter(
      (task) => task.id === taskId
    )[0];
    if (!taskByBoardIdAndTaskId) {
      throw new HttpError(`There are no tasks on ${board.title} board.`, 404);
    }
    return taskByBoardIdAndTaskId;
  }
  /**
   * take board's ID and task's body and returns a created task
   * @param newTaskBody new task's body
   * @param boardId board's ID
   * @returns created Task
   */
  static createTask(newTaskBody: TaskBody, boardId: string): Task {

    const taskData: Task = new Task(
      newTaskBody.title,
      newTaskBody.order,
      newTaskBody.description,
      newTaskBody.userId,
      boardId,
      newTaskBody.columnId
    );

    taskData.boardId = boardId

    DB.tasks.push(taskData);

    return taskData;
  }
  /**
   * take task's ID, board ID and task's body and returns an updated task
   * @param boardId board's ID
   * @param taskId new task's ID
   * @param TaskBody new task's body
   * @returns updated task
   */
  static updateTask(boardId: string,taskId: string, TaskBody: TaskBody): Task {

    const newTaskParams:Task = {
      id: taskId,
      title: TaskBody.title,
      order: TaskBody.order,
      description: TaskBody.description,
      userId: TaskBody.userId,
      boardId: TaskBody.boardId,
      columnId: TaskBody.columnId
    };
    const task: Task = this.getTaskById(boardId, taskId);
    const tasksInStr:string[] = DB.tasks.map((tsk) => JSON.stringify(tsk));
    const indexOfTask:number = tasksInStr.indexOf(JSON.stringify(task));

    DB.tasks[indexOfTask] = { ...task, ...newTaskParams };

    return DB.tasks[indexOfTask];
  }
  /**
   * take task's ID and returns a deleted task
   * @param boardId board's ID
   * @param taskId task's ID
   * @returns deleted task
   */
  static delTask(boardId: string,taskId:string): Task {
    const task:Task = this.getTaskById(boardId, taskId);
    DB.tasks = DB.tasks.filter((tsk:Task) => tsk.id !== taskId);

    return task;
  }
}
export {
  TaskRepo
};