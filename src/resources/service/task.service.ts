import { TaskRepo } from '../repo/task.repo';
import {  throwError } from '../../errors';
import { Request, Response } from 'express';
import { Task } from '../../entities/task.model';
import { CustomLogger } from '../../logger/logger';

type TaskBody = {
  title: string,
  order: string|number,
  description: string,
  userId: string|null,
  boardId: string|null,
  columnId: string|null

}
/**
 * The main service for tasks.
 */
class TaskService {
  /**
   * handles a GET request and make return response with a list of all tasks
   * @param req GET Request
   * @param res GET Response
   */
  static async getAll(req: Request, res: Response) {

    try {
      const tasks = await TaskRepo.All();

      res.status(200);
      res.send(tasks);
      CustomLogger.infoLog(req, 200);
      res.end();
    } catch (err) {
      throwError(req,res, err as Error );
    }
  }
  /**
   * handles a GET request and make return response with a task by id
   * @param req GET Request
   * @param res GET Response
   */
  static async getTaskByID(req: Request, res: Response) {

    try {
      const { taskId } = req.params;
      const { boardId } = req.params;

      const task: Task = await TaskRepo.getTaskById(boardId,taskId);

      res.status(200)
      res.send(task);
      CustomLogger.infoLog(req, 200);
      res.end();
    } catch (err) {

      throwError(req,res, err as Error);
    }
  }
  /**
   * handles a GET request and make return response with a task by boardID
   * @param req GET Request
   * @param res GET Response
   */
  static async getTasksByID(req: Request, res: Response) {

    try {
      const { boardId } = req.params;

      const task = await TaskRepo.getTasksById(boardId);

      res.status(200)
      res.send(task);
      CustomLogger.infoLog(req, 200);
      res.end();
    } catch (err) {
      throwError(req,res, err as Error);
    }
  }
  /**
   * handles a POST request and make return response with a created task
   * @param req POST Request
   * @param res POST Response
   */
  static async createTask(req: Request, res: Response) {

    try {
      const { boardId } = req.params;
      const requestBody: TaskBody  = await req.body;

      const task: Task = await TaskRepo.createTask(requestBody,boardId);

      res.status(201)
      res.send(task);
      CustomLogger.infoLog(req, 201);
      res.end();
    } catch (err) {
      throwError(req,res, err as Error);
    }
  }
  /**
   * handles a PUT request and make return response with a updated task
   * @param req PUT Request
   * @param res PUT Response
   */
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
      CustomLogger.infoLog(req, 200);
      res.end();
    } catch (err) {
      throwError(req,res, err as Error);
    }
  }
  /**
   * handles a DELETE request and make return response with status 204
   * @param req DELETE Request
   * @param res DELETE Response
   */
  static async deleteTask(req: Request, res: Response) {

    try {

      await TaskRepo.delTask(req.params.boardId, req.params.taskId);

      res.status(204)
      CustomLogger.infoLog(req, 204);

      res.end();

    } catch (err) {

      throwError(req, res, err as Error);
    }
  }
}

export { TaskService };