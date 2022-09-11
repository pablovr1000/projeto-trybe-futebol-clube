import { Router } from 'express';

const routerUser = Router();

routerUser.get('/login');
routerUser.post('/login/validate');

export default routerUser;
