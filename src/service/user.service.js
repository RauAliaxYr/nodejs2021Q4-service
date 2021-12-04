const uuid = require('uuid');
const usersRepo = require('../repo/user.memory.repository');
const UserModel = require('../models/user.model');

function valid(body) {
  return typeof body.name === 'string' && typeof body.login === 'string' && typeof body.password === 'string' && Object.keys(body).length === 3;
}

const UserService = {
  all: (ctx) => {
    const users = usersRepo.getAll();
    ctx.body = users;
  },
  byId: (ctx, id) => {
    if (!uuid.validate(id)) {
      ctx.throw(404, 'Invalid id');
    }
    const user = usersRepo.getById(id);

    if (user === 'User is not found') {
      ctx.throw(404, 'User is not found');
    } else {
      ctx.body = UserModel.toResponse(user);
    }
  },
  create: (ctx) => {
    if (valid(ctx.request.body)) {
      const user = usersRepo.createUser(ctx.request.body.name, ctx.request.body.login, ctx.request.body.password);
      ctx.body = UserModel.toResponse(user);
    } else ctx.throw(404, 'Invalid body');
  },
  update: (ctx, id) => {
    if (valid(ctx.request.body)) {
      const user = usersRepo.updateUser(id, ctx.request.body.name, ctx.request.body.login, ctx.request.body.password);
      if (user === 'User is not found') {
        ctx.throw(404, 'User is not found');
      } else {
        ctx.body = UserModel.toResponse(user);
      }
    } else ctx.throw(404, 'Invalid body');
  },
  delete: (ctx, id) => {
    if (uuid.validate(id)) {
      const user = usersRepo.deleteUser(id);
      if (user === 'User is not found') {
        ctx.throw(404, 'User is not found');
      }
      ctx.status = 204;

    }
  }
};



module.exports = { UserService };