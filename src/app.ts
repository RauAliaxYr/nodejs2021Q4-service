import express from 'express';
import userRouter from './resources/routs/user.route';
import boardsRouter from './resources/routs/board.route';
import taskRouter from './resources/routs/task.route';
import { throwUncaughtException } from './errors';
import  authRouter  from './resources/routs/auth.route';


const app = express();


app.use(express.json());
app.use(userRouter);
app.use(boardsRouter);
app.use(taskRouter);
app.use(authRouter)

process
  .on('unhandledRejection', (err, promise) => {

    throwUncaughtException(err as Error);
  })
  .on('uncaughtException', err => {
    throwUncaughtException(err);
  });


export { app };