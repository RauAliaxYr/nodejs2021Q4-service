const Router = require('koa-route');
const task = require('../service/task.service');

const get = Router.get('/boards/:boardId/tasks', task.TaskService.all)
const getById =Router.get('/boards/:boardId/tasks/:taskId', task.TaskService.byId)
const create = Router.post('/boards/:boardId/tasks', task.TaskService.create)
const update = Router.put('/boards/:boardId/tasks/:taskId',task.TaskService.update)
const deleteTask = Router.delete('/boards/:boardId/tasks/:taskId',task.TaskService.delete)


module.exports = {get,getById,create,update,deleteTask};