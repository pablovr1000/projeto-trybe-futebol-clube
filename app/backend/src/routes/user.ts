import { Router } from 'express';
import userMiddleware from '../middleware/user.middleware';
import UserController from '../controller/user.controller';
import validateToken from '../middleware/token.middleware';

const routerUser = Router();
const userController = new UserController();

routerUser.post('/login', userMiddleware, userController.authenticateLogin);
routerUser.get('/login/validate', validateToken, userController.authenticateValidation);

export default routerUser;
