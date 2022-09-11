import { Router } from 'express';

const routerTeam = Router();

routerTeam.get('/teams');
routerTeam.post('/teams/:id');

export default routerTeam;
