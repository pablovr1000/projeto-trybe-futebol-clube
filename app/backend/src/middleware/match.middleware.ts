import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
// import Team from '../database/models/Teams';

const createMatchValidation = async (request: Request, response: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = request.body;
  if (homeTeam && awayTeam && (homeTeam === awayTeam)) {
    return response.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  /* const homeTeamIsExistent = await Team.findByPk(homeTeam);
  const awayTeamIsExistent = await Team.findByPk(awayTeam);
  if (!homeTeamIsExistent || !awayTeamIsExistent) {
    return response.status(StatusCodes.NOT_FOUND)
      .json({ message: 'There is no team with such id!' });
  } */

  next();
};

export default createMatchValidation;
