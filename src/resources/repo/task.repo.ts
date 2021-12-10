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


class TaskRepo {
  static All(): Array<Task> {

    return DB.tasks;
  }

  static getTasksById(boardId: string): Array<Task> {
    const board: Board = BoardRepo.getBoardById(boardId);
    const filteredByBoardIdTasks: Array<Task> = DB.tasks.filter((task: Task) => task.boardId === boardId);

    if (filteredByBoardIdTasks.length === 0) {
      throw new HttpError(`There are no tasks on ${board.title} board.`, 404);
    }
    return filteredByBoardIdTasks;
  }

  static getTaskById(boardId: string, taskId: string): Task {
    const board: Board = BoardRepo.getBoardById(boardId);
    const filteredByBoardIdTasks: Array<Task> = DB.tasks.filter((task: Task) => task.boardId === boardId);
    const taskByBoardIdAndTaskId: Task = filteredByBoardIdTasks.filter(
      (task) => task.id === taskId
    )[0];
    if (!taskByBoardIdAndTaskId) {
      console.log('kek')
      throw new HttpError(`There are no tasks on ${board.title} board.`, 404);
    }
    return taskByBoardIdAndTaskId;
  }

  static createTask(newTaskBody: TaskBody, boardId: string): Task {

    let taskData: Task = new Task(
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

  static updateTask(boardId: string,taskId: string, TaskBody: TaskBody): Task {

    let newTaskParams:Task = {
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

  static delTask(boardId: string,taskId:string): Task {
    const task:Task = this.getTaskById(boardId, taskId);
    DB.tasks = DB.tasks.filter((tsk:Task) => tsk.id !== taskId);

    return task;
  }
}
export {
  TaskRepo
};