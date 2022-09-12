import { StatusCodes } from 'http-status-codes';
import HttpException from '../utils/http.exception';
import Team from '../database/models/Teams';

export default class TeamService {
  public getAll = async () => Team.findAll();

  public getById = async (id: string) => {
    const teamById = await Team.findByPk(id);

    if (!teamById) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'No team was found');
    }

    return teamById;
  };
}
