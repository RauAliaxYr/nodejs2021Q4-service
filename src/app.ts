
import userRouter from './resources/routs/user.route'
import boardsRouter from './resources/routs/board.route'

import express from 'express';

const app = express();


app.use(express.json())
app.use(userRouter)
app.use(boardsRouter)


export {app}