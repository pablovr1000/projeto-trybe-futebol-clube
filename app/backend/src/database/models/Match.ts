import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Match extends Model {
  id: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

Match.init(
  {
    id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    homeTeam: { primaryKey: true, type: INTEGER },
    homeTeamGoals: { type: INTEGER },
    awayTeam: { type: INTEGER },
    awayTeamGoals: { type: INTEGER },
    inProgress: { type: BOOLEAN },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Match.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
