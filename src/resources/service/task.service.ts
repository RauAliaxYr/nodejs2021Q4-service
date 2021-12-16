import { TaskRepo } from '../repo/task.repo';
import {  throwError } from '../../errors';
import { Request, Response } from 'express';
import { Task } from '../models/task.model';

type TaskBody = {
  title: string,
  order: string|number,
  description: string,
  userId: string|null,
  boardId: string|null,
  columnId: string|null

}

class TaskService {
  static async getAll(req: Request, res: Response) {

    try {
      const tasks = await TaskRepo.All();

      res.status(200);
      res.send(tasks);
      res.end();
    } catch (err) {
      throwError(res, err as Error );
    }
  }

  static async getTaskByID(req: Request, res: Response) {

    try {
      const { taskId } = req.params;
      const { boardId } = req.params;

      const task: Task = await TaskRepo.getTaskById(boardId,taskId);

      res.status(200)
      res.send(task);
      res.end();
    } catch (err) {

      throwError(res, err as Error);
    }
  }
  static async getTasksByID(req: Request, res: Response) {

    try {
      const { boardId } = req.params;

      const task = await TaskRepo.getTasksById(boardId);

      res.status(200)
      res.send(task);
      res.end();
    } catch (err) {
      throwError(res, err as Error);
    }
  }

  static async createTask(req: Request, res: Response) {

    try {
      const { boardId } = req.params;
      const requestBody: TaskBody  = await req.body;

      const task: Task = await TaskRepo.createTask(requestBody,boardId);

      res.status(201)
      res.send(task);
      res.end();
    } catch (err) {
      throwError(res, err as Error);
    }
  }

  static async updateTask(req: Request, res: Response) {

    try {
      const { taskId } = req.params;
      const { boardId } = req.params
      const taskBody = req.body

      const task = await TaskRepo.updateTask(
        boardId,
        taskId,
        taskBody
      );
      res.status(200)
      res.send(task);
      res.end();
    } catch (err) {
      throwError(res, err as Error);
    }
  }

  static async deleteTask(req: Request, res: Response) {

    try {

      await TaskRepo.delTask(req.params.boardId, req.params.taskId);

      res.status(204)

      res.end();

    } catch (err) {

      throwError(res, err as Error);
    }
  }
}

export { TaskService };