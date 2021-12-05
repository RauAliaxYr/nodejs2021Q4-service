const uuid = require('uuid');
const tasksRepo = require('../repo/task.memory.repo');
const TaskModel = require('../models/task.model');


function valid(body) {
  return Object.keys(body).length === 6;
}

const TaskService = {
  all: (ctx) => {
    ctx.body = tasksRepo.getAll();
  },
  byId: (ctx, boardId, taskId) => {
    if (!uuid.validate(boardId) && !uuid.validate(taskId)) {
      ctx.throw(404, 'Invalid id');
    }
    const task = tasksRepo.getById(taskId);
    if (task === 'Task is not found') {
      ctx.throw(404, 'Task is not found');
    } else {
      ctx.status = 200;
      const [tasked] = task;
      ctx.body = tasked;
    }
  },
  create: (ctx, boardId) => {
    if (valid(ctx.request.body)) {
      const task = tasksRepo.createTask(ctx.request.body.title, ctx.request.body.order, ctx.request.body.description, ctx.request.body.userId, boardId, ctx.request.body.columnId);
      ctx.status = 201;
      ctx.body = task;
    } else ctx.throw(404, 'Invalid body');
  },
  update: (ctx, boardId, taskId) => {
    try {
      const task = tasksRepo.updateTask(taskId, ctx.request.body.title, ctx.request.body.order, ctx.request.body.description, ctx.request.body.userId, ctx.request.body.boardId, ctx.request.body.columnId);

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
  delete: (ctx, boardId, taskId) => {
    if (!uuid.validate(boardId) && !uuid.validate(taskId)) {
      ctx.throw(404, 'Invalid id');
    }
    const task = tasksRepo.deleteTask(taskId);
    if (task === 'Task is not found') {
      ctx.throw(404, 'Task is not found');
    }
    ctx.status = 204;
  }

};


module.exports = { TaskService };