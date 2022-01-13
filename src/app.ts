import express from 'express';
import { createConnection } from "typeorm";
import userRouter from './resources/routs/user.route';
import boardsRouter from './resources/routs/board.route';
import taskRouter from './resources/routs/task.route';
import { throwUncaughtException } from './errors';


const app = express();
createConnection().then(connection => {

  app.use(express.json());
  app.use(userRouter);
  app.use(boardsRouter);
  app.use(taskRouter);

  process
    .on('unhandledRejection', (err, promise) => {
      throwUncaughtException(err as Error);
    })
    .on('uncaughtException', err => {
      throwUncaughtException(err);
    })
}).catch(err => console.log(err))



export { app };