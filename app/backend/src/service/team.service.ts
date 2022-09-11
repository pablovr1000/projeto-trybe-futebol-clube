import Team from '../database/models/Teams';

export default class TeamService {
  public getAll = async () => {
    const findTeams = await Team.findAll();

    if (!findTeams) return { statusCode: 401, message: 'No teams found' };

    return { statusCode: 200, teams: findTeams };
  };

  public getById = async (id: string) => {
    const findTeamById = await Team.findByPk(id);

    if (!findTeamById) return { statusCode: 401, message: 'Team not found' };

    return { statusCode: 200, team: findTeamById };
  };
}
