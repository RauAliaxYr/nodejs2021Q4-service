import express from 'express';
import { UsersService } from '../service/user.service'

const userRouter = express.Router()

userRouter.get('/users', UsersService.getAll)
userRouter.get('/users/:userId', UsersService.getUserByID)
userRouter.post('/users', UsersService.createUser)
userRouter.put('/users/:userId',UsersService.updateUser)
userRouter.delete('/users/:userId',UsersService.deleteUser)

export default userRouter