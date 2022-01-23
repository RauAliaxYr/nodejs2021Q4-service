import express from 'express';
import { TaskService } from '../service/task.service';
import { isAuthorized } from '../../auth/isAuthorized';

const taskRouter = express.Router();

taskRouter.get('/boards/:boardId/tasks', isAuthorized, TaskService.getAll);
taskRouter.get('/boards/:boardId/tasks/:id', isAuthorized, TaskService.getTaskByID);
taskRouter.post('/boards/:boardId/tasks', isAuthorized, TaskService.createTask);
taskRouter.put('/boards/:boardId/tasks/:taskId', isAuthorized, TaskService.updateTask);
taskRouter.delete('/boards/:boardId/tasks/:taskId', isAuthorized, TaskService.deleteTask);

export default taskRouter;