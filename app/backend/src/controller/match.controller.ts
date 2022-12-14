import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchService from '../service/match.service';

export default class MatchesController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public getAllMatches = async (_request: Request, response: Response) => {
    const allMatches = await this.matchService.getAllMatches(null);

    /* if (!allMatches) {
      return response.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'ok' });
    } */

    return response.status(StatusCodes.OK).json(allMatches);
  };

  public getMatchById = async (request: Request, response: Response) => {
    const { statusCode, match, message } = await this.matchService.getMatchById(request.params.id);

    if (!match) {
      return response.status(statusCode).json({ message });
    }

    return response.status(statusCode).json(match);
  };

  public createMatch = async (request: Request, response: Response) => {
    const {
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    } = request.body;

    const { statusCode, match, message } = await this.matchService.createMatch({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });

    if (!match) {
      return response.status(statusCode).json({ message });
    }

    return response.status(statusCode).json(match);
  };

  public finishMatch = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { statusCode, match, message } = await this.matchService.finishMatch(Number(id));

    if (!match) {
      return response.status(statusCode).json({ message });
    }

    return response.status(statusCode).json(match);
  };

  public updateMatch = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { homeTeamGoals, awayTeamGoals } = request.body;

    const { statusCode, match, message } = await this.matchService
      .updateMatch(Number(id), homeTeamGoals, awayTeamGoals);

    if (!match) {
      return response.status(statusCode).json({ message });
    }

    return response.status(statusCode).json(match);
  };
}
