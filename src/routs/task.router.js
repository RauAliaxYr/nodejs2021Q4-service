const Router = require('koa-route');
const task = require('../service/task.service');

const get = Router.get('/tasks', task.TaskService.all)
const getById =Router.get('/tasks/:taskId', task.TaskService.byId)
const create = Router.post('/tasks', task.TaskService.create)
const update = Router.put('/tasks/:taskId',task.TaskService.update)
const deleteTask = Router.delete('/tasks/:taskId',task.TaskService.delete)


module.exports = {get,getById,create,update,deleteTask};