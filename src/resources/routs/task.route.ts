import express from 'express';
import { TaskService } from '../service/task.service'

const taskRouter = express.Router()

taskRouter.get('/boards/:boardId/tasks', TaskService.getAll)
taskRouter.get('/boards/:boardId/tasks/:taskId', TaskService.getTaskByID)
taskRouter.post('/boards/:boardId/tasks', TaskService.createTask)
taskRouter.put('/boards/:boardId/tasks/:taskId',TaskService.updateTask)
taskRouter.delete('/boards/:boardId/tasks/:taskId',TaskService.deleteTask)

export default taskRouter