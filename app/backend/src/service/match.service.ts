import MatchInterface from '../interfaces/match';
import Match from '../database/models/Match';
import Team from '../database/models/Teams';

export default class MatchService {
  notFound:string;
  private _query = {
    include: [
      {
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
    ],
  };

  constructor() {
    this.notFound = 'Match not found';
  }

  public getAllMatches = async (inProgress: 'true' | 'false' | null) => {
    if (!inProgress) return Match.findAll(this._query);
    if (inProgress === 'true') {
      return Match.findAll({
        ...this._query,
        where: { inProgress: true },
      });
    }

    if (inProgress === 'false') {
      return Match.findAll({
        ...this._query,
        where: { inProgress: false },
      });
    }

    return Match.findAll({
      ...this._query,
      where: { inProgress: false },
    });
  };

  public getMatchById = async (id: string) => {
    const findMatchById = await Match.findByPk(id);

    if (!findMatchById) return { statusCode: 401, message: this.notFound };

    return { statusCode: 200, match: findMatchById };
  };

  public createMatch = async ({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
  }: MatchInterface) => {
    const findHomeTeam = await Match.findByPk(homeTeam);
    const findAwayTeam = await Match.findByPk(awayTeam);

    if (!findHomeTeam || !findAwayTeam) {
      return { statusCode: 404, message: 'There is no team with such id!' };
    }

    const createMatch = await Match.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });

    if (!createMatch) return { statusCode: 401, message: 'Error! Match not created' };

    return { statusCode: 201, match: createMatch };
  };

  public updateMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const findMatchInProgress = await Match.findByPk(id);

    if (!findMatchInProgress) return { statusCode: 401, message: 'Match not found' };

    const updateMatch = await Match.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id } },
    );

    if (!updateMatch) return { statusCode: 401, message: 'Error! Match not updated' };

    return {
      statusCode: 200,
      match: {
        homeTeamGoals,
        awayTeamGoals,
      },
    };
  };

  public finishMatch = async (id: number) => {
    const findMatchInProgress = await Match.findByPk(id);

    if (!findMatchInProgress) return { statusCode: 401, message: this.notFound };

    const updateMatch = await Match.update(
      {
        inProgress: false,
      },
      { where: { id } },
    );

    if (!updateMatch) return { statusCode: 401, message: 'Error! Match not updated' };

    return { statusCode: 200, match: updateMatch };
  };
}
