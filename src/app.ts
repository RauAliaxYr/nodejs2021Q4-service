import express from 'express';
import userRouter from './resources/routs/user.route'
import boardsRouter from './resources/routs/board.route'
import taskRouter from './resources/routs/task.route'


const app = express();


app.use(express.json())
app.use(userRouter)
app.use(boardsRouter)
app.use(taskRouter)


export {app}