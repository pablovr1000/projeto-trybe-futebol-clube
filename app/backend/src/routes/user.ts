import { Router } from 'express';
import userMiddleware from '../middleware/user.middleware';
import UserController from '../controller/user.controller';
import validateToken from '../middleware/token.middleware';

const routerUser = Router();

routerUser.post('/login', userMiddleware, UserController.authenticateLogin);
routerUser.get('/login/validate', validateToken, UserController.authenticateValidation);

export default routerUser;
