import { Router } from 'express';

const routerMatch = Router();

routerMatch.get('/matches');
routerMatch.get('/matches/:id');
routerMatch.post('/matches');
routerMatch.patch('/matches/:id');
routerMatch.patch('/matches/:id/finish');

export default routerMatch;
