import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Team from '../database/models/Teams';
import StatusError from '../utils/http.exception';

const createMatchValidation = async (request: Request, _response: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = request.body;
  if (homeTeam === awayTeam) {
    throw new StatusError(
      'It is not possible to create a match with two equal teams',
      StatusCodes.UNAUTHORIZED,
    );
  }

  const homeTeamIsExistent = await Team.findByPk(homeTeam);
  const awayTeamIsExistent = await Team.findByPk(awayTeam);
  if (!homeTeamIsExistent || !awayTeamIsExistent) {
    throw new StatusError(
      'There is no team with such id!',
      StatusCodes.NOT_FOUND,
    );
  }

  next();
};

export default createMatchValidation;
