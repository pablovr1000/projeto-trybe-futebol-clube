import { Request, Response } from 'express';
import MatchService from '../service/match.service';

export default class MatchesController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public getAllMatches = async (_request: Request, response: Response) => {
    const { statusCode, allMatches, message } = await this.matchService.getAllMatches();

    if (!allMatches) {
      return response.status(statusCode).json({ message });
    }

    return response.status(statusCode).json(allMatches);
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

    if (homeTeam === awayTeam) {
      return response.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

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
