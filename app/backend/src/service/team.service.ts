import { StatusCodes } from 'http-status-codes';
import Team from '../database/models/Teams';

export default class TeamService {
  public getAll = async () => {
    const allTeams = await Team.findAll();
    if (!allTeams) {
      return { statusCode: StatusCodes.NOT_FOUND, message: 'No teams found', teams: [] };
    }
    return { statusCode: StatusCodes.OK, teams: allTeams };
  };

  public getById = async (id: string) => {
    const teamById = await Team.findByPk(id);

    if (!teamById) return { statusCode: StatusCodes.NOT_FOUND, message: 'Team not found' };

    return { statusCode: StatusCodes.OK, team: teamById };
  };
}
