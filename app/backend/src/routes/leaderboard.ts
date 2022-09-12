import { Router } from 'express';
import LeaderboardController from '../controller/leaderboard.controller';

const routerLeaderboard = Router();

routerLeaderboard.get('/leaderboard', LeaderboardController.getLeaderboard);
routerLeaderboard.get('/leaderboard/away', LeaderboardController.getAwayTeam);
routerLeaderboard.get('/leaderboard/home', LeaderboardController.getHomeTeam);

export default routerLeaderboard;
