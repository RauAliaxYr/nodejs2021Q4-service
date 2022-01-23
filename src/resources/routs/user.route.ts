import express from 'express';
import { UsersService } from '../service/user.service';
import { isAuthorized } from '../../auth/isAuthorized';

const userRouter = express.Router();

userRouter.get('/users', isAuthorized, UsersService.getAll);
userRouter.get('/users/:userId', isAuthorized, UsersService.getUserByID);
userRouter.post('/users', isAuthorized, UsersService.createUser);
userRouter.put('/users/:userId', isAuthorized, UsersService.updateUser);
userRouter.delete('/users/:userId', isAuthorized, UsersService.deleteUser);

export default userRouter;