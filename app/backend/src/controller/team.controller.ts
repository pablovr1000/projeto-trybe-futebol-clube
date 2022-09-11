import { Request, Response } from 'express';
import TeamService from '../service/team.service';

export default class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public getAll = async (_request: Request, response: Response) => {
    const { statusCode, teams, message } = await this.teamService.getAll();

    if (!teams) {
      return response.status(statusCode).json({ message });
    }

    return response.status(statusCode).json(teams);
  };

  public getById = async (request: Request, response: Response) => {
    const { statusCode, team, message } = await this.teamService.getById(request.params.id);

    if (!team) {
      return response.status(statusCode).json({ message });
    }

    return response.status(statusCode).json(team);
  };
}
