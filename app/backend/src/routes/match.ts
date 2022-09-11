import { Router } from 'express';
import validateToken from '../middleware/token.middleware';
import MatchesController from '../controller/match.controller';

const routerMatch = Router();

const matchesController = new MatchesController();

routerMatch.get('/matches', matchesController.getAllMatches);
routerMatch.get('/matches/:id', matchesController.getMatchById);
routerMatch.post('/matches', validateToken, matchesController.createMatch); // Add validação Joi
routerMatch.patch('/matches/:id', validateToken, matchesController.updateMatch); // Add validação Joi
routerMatch.patch('/matches/:id/finish', validateToken, matchesController.finishMatch);

export default routerMatch;
