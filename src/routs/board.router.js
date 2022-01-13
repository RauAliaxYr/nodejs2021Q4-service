const Router = require('koa-route');
const board = require('../service/board.service');

const get = Router.get('/boards', board.BoardService.all)
const getById =Router.get('/boards/:boardId', board.BoardService.byId)
const create = Router.post('/boards', board.BoardService.create)
const update = Router.put('/boards/:boardId',board.BoardService.update)
const deleteBoard = Router.delete('/boards/:boardId',board.BoardService.delete)


module.exports = {get,getById,create,update,deleteBoard};