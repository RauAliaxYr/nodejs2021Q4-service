const Koa = require('koa');
// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');
const bodyParser = require('koa-bodyparser');
const UserRouter =require("./routs/user.router")
const TaskRouter =require("./routs/task.router")
// const BoardRouter =require('../src/routs/board.router')

const app = new Koa();

// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(bodyParser())

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(UserRouter.get)
app.use(UserRouter.getById)
app.use(UserRouter.create)
app.use(UserRouter.update)
app.use(UserRouter.deleteUser)
app.use(TaskRouter.get)
app.use(TaskRouter.getById)
app.use(TaskRouter.create)
app.use(TaskRouter.update)
app.use(TaskRouter.deleteTask)

// app.use(BoardRouter)


module.exports = app;
