const uuid = require('uuid');
const boardsRepo = require('../repo/board.memory.repo');


function valid(body) {
  return Object.keys(body).length === 2;
}

const BoardService = {
  all: (ctx) => {
    const boards = boardsRepo.getAll();
    ctx.body = boards;
  },
  byId: (ctx, id) => {
    if (!uuid.validate(id)) {
      ctx.throw(404, 'Invalid id');
    }
    const board = boardsRepo.getById(id);
    if (board === 'Board is not found') {
      ctx.throw(404, 'Board is not found');
    } else {
      ctx.status = 200;
      const [boarded] = board

      ctx.body = boarded;
    }
  },
  create: (ctx) => {
    if (valid(ctx.request.body)) {
      const board = boardsRepo.createBoard(ctx.request.body.title, ctx.request.body.columns);
      ctx.status = 201;
      ctx.body = board;
    } else ctx.throw(404, 'Invalid body');
  },
  update: (ctx, id) => {
    try {
      const board = boardsRepo.updateBoard(id, ctx.request.body.title, ctx.request.body.columns);

      if (board === 'Board is not found') {
        ctx.throw(404, 'Board is not found');
      } else {
        ctx.status = 200;
        ctx.body = board;
      }
    } catch (e) {
      ctx.throw(404, 'Invalid body');
    }
  },
  delete: (ctx, id) => {
    if (!uuid.validate(id)) {
      ctx.throw(404, 'Board is not found');
    }
    const board = boardsRepo.deleteBoard(id);
    if (board === 'Board is not found') {
      ctx.throw(404, 'Board is not found');
    }
    ctx.status = 204;
  }
};


module.exports = { BoardService };