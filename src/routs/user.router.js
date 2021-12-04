const Router = require('koa-route');
const user = require('../service/user.service');

const get = Router.get('/user', user.UserService.all)
const getById =Router.get('/user/:userId', user.UserService.byId)
const create = Router.post('/user', user.UserService.create)
const update = Router.put('/user/:userId',user.UserService.update)
const deleteUser = Router.delete('/user/:userId',user.UserService.delete)


module.exports = {get,getById,create,update,deleteUser};
