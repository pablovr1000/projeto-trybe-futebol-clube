import { Router } from 'express';
import TeamController from '../controller/team.controller';

const routerTeam = Router();
const teamController = new TeamController();

routerTeam.get('/teams', teamController.getAll);
routerTeam.post('/teams/:id', teamController.getById);

export default routerTeam;
