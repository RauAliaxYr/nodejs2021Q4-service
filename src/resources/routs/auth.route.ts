import { Router } from 'express';
import * as authService from '../service/auth.service';

const authRouter: Router = Router();

authRouter.post('/login', authService.login);

export default authRouter
