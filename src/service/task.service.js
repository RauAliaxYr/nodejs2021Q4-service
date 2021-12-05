const uuid = require('uuid');
const tasksRepo = require('../repo/task.memory.repo');
const TaskModel = require('../models/task.model');

function valid(body) {
  return typeof body.name === 'string' && typeof body.login === 'string' && typeof body.password === 'string' && Object.keys(body).length === 3;
}

const TaskService = {
  all: (ctx) => {
    const tasks = tasksRepo.getAll();
    ctx.body = tasks;
  },
  byId: (ctx, id) => {
    if (!uuid.validate(id)) {
      ctx.throw(404, 'Invalid id');
    }
    const task = tasksRepo.getById(id);
    if (task === 'Task is not found') {
      ctx.throw(404, 'Task is not found');
    } else {
      ctx.status = 200;
      ctx.body = TaskModel.toResponse(task[0]);
    }
  },
  create: (ctx) => {
    if (valid(ctx.request.body)) {
      const task = tasksRepo.createTask(ctx.request.body.name, ctx.request.body.login, ctx.request.body.password);
      ctx.status = 201;
      ctx.body = TaskModel.toResponse(task);
    } else ctx.throw(404, 'Invalid body');
  },
  update: (ctx, id) => {
    try {
      const task = tasksRepo.updateTask(id, ctx.request.body.name, ctx.request.body.login, ctx.request.body.password);

      if (task === 'Task is not found') {
        ctx.throw(404, 'Task is not found');
      } else {
        ctx.status = 200;
        ctx.body = TaskModel.toResponse(task);
      }
    } catch (e) {
      ctx.throw(404, 'Invalid body');
    }
  },
  delete: (ctx, id) => {
    if (uuid.validate(id)) {
      const task = tasksRepo.deleteTask(id);
      if (task === 'Task is not found') {
        ctx.throw(404, 'Task is not found');
      }
      ctx.status = 204;

    }
  }
};


module.exports = { TaskService };