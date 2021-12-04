const Router = require('koa-route');
const user = require('../service/user.service');

const get = Router.get('/users', user.UserService.all)
const getById =Router.get('/users/:userId', user.UserService.byId)
const create = Router.post('/users', user.UserService.create)
const update = Router.put('/users/:userId',user.UserService.update)
const deleteUser = Router.delete('/users/:userId',user.UserService.delete)


module.exports = {get,getById,create,update,deleteUser};
