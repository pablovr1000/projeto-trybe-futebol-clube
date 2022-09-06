import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  id: number;
  teamName: string;
}

Teams.init(
  {
    id: { type: INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    teamName: { type: STRING },
  },
  {
    sequelize: db,
    underscored: true,
    modelName: 'teams',
    timestamps: false,
  },
);

export default Teams;
