
import userRouter from './resources/routs/user.route'

import express from 'express';

const app = express();


app.use(express.json())
app.use(userRouter)


export {app}