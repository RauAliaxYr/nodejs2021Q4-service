import { TaskRepo } from '../repo/task.repo';
import { HttpError, throwError } from '../../errors';
import { Request, Response } from 'express';
import { Task } from '../models/task.model';
import { DB } from '../../db/db';


class TaskService {
  static async getAll(req: Request, res: Response) {

    try {
      const tasks = await TaskRepo.All();

      res.status(200);
      res.send(tasks);
      res.end();
    } catch (err) {
      throwError(res, err );
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

      throwError(res, err);
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
      throwError(res, err);
    }
  }

  static async createTask(req: Request, res: Response) {

    try {
      const { boardId } = req.params;
      let requestBody: any = await req.body;

      let task: Task = await TaskRepo.createTask(requestBody,boardId);

      res.status(201)
      res.send(task);
      res.end();
    } catch (err) {
      throwError(res, err);
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
      throwError(res, err);
    }
  }

  static async deleteTask(req: Request, res: Response) {

    try {

      await TaskRepo.delTask(req.params.boardId, req.params.taskId);

      res.status(204)

      res.end();

    } catch (err) {

      throwError(res, err);
    }
  }
}

export { TaskService };