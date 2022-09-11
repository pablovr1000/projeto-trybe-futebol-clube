import { Router } from 'express';
import validateToken from '../middleware/token.middleware';
import MatchesController from '../controller/match.controller';

const routerMatch = Router();

const matchesController = new MatchesController();

routerMatch.get('/matches', matchesController.getAllMatches);
routerMatch.get('/matches/:id', matchesController.getMatchById);
routerMatch.post('/matches', validateToken, matchesController.createMatch);
routerMatch.patch('/matches/:id', matchesController.updateMatch);
routerMatch.patch('/matches/:id/finish', matchesController.finishMatch);

export default routerMatch;
