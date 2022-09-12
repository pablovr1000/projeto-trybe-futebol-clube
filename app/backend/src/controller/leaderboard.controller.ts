import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardServices from '../service/leaderboard.service';

class LeaderboardController {
  constructor(private leaderboardServices = new LeaderboardServices()) {}

  public getLeaderboard = async (_request: Request, response: Response) => {
    const leaderboard = await this.leaderboardServices.getLeaderboard();

    response.status(StatusCodes.OK).json(leaderboard);
  };

  public getAwayTeam = async (_request: Request, response: Response) => {
    const away = await this.leaderboardServices.getGameTeams('away');

    response.status(StatusCodes.OK).json(away);
  };

  public getHomeTeam = async (_request: Request, response: Response) => {
    const home = await this.leaderboardServices.getGameTeams('home');

    response.status(StatusCodes.OK).json(home);
  };
}

export default new LeaderboardController();
