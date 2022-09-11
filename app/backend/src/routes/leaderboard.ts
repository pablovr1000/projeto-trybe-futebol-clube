import { Router } from 'express';

const routerLeaderboard = Router();

routerLeaderboard.get('/leaderboard');
routerLeaderboard.get('/leaderboard/away');
routerLeaderboard.get('/leaderboard/home');

export default routerLeaderboard;
