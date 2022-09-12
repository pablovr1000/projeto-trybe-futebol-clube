import { Router } from 'express';
import validateToken from '../middleware/token.middleware';
import MatchesController from '../controller/match.controller';
import { createMatch, updateMatch } from '../middleware/joi/match.joi';
import joiValidation from '../middleware/match.body.middleware';
import createMatchValidation from '../middleware/match.middleware';

const routerMatch = Router();

const matchesController = new MatchesController();

routerMatch.get('/matches', matchesController.getAllMatches);
routerMatch.get('/matches/:id', matchesController.getMatchById);
routerMatch
  .post(
    '/matches',
    validateToken,
    createMatchValidation,
    joiValidation(createMatch),
    matchesController.createMatch,
  );
routerMatch
  .patch(
    '/matches/:id',
    validateToken,
    joiValidation(updateMatch),
    matchesController.updateMatch,
  );
routerMatch.patch('/matches/:id/finish', validateToken, matchesController.finishMatch);

export default routerMatch;
