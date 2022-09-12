import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Team from '../database/models/Teams';
import HttpException from '../utils/http.exception';

const createMatchValidation = async (request: Request, _response: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = request.body;
  if (homeTeam === awayTeam) {
    throw new HttpException(
      StatusCodes.UNAUTHORIZED,
      'It is not possible to create a match with two equal teams',
    );
  }

  const homeTeamIsExistent = await Team.findByPk(homeTeam);
  const awayTeamIsExistent = await Team.findByPk(awayTeam);
  if (!homeTeamIsExistent || !awayTeamIsExistent) {
    throw new HttpException(
      StatusCodes.NOT_FOUND,
      'There is no team with such id!',
    );
  }

  next();
};

export default createMatchValidation;
