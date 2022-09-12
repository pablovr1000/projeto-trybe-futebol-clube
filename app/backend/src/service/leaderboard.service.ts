import Team from '../database/models/Teams';
import Match from '../database/models/Match';
import MatchesServices from './match.service';
import TeamsService from './team.service';
import Leaderboard from '../interfaces/leaderboard';

interface LeaderboardStatus extends Leaderboard {
  id: number;
}

export default class LeaderboardServices {
  private _leaderboard: LeaderboardStatus[];
  private _leaderboardWithoutId: Leaderboard[];

  constructor(
    private matchServices = new MatchesServices(),
    private teamServices = new TeamsService(),
  ) {}

  private setTeams = (allTeams: Team[]): void => {
    this._leaderboard = allTeams.map((team) => ({
      id: team.id,
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));
  };

  private setTeamPoints = (team: LeaderboardStatus, t1Score: number, t2Score: number) => {
    const teamSelected = team;
    if (t1Score === t2Score) {
      teamSelected.totalPoints += 1;
      teamSelected.totalDraws += 1;
    }
    if (t1Score > t2Score) {
      teamSelected.totalPoints += 3;
      teamSelected.totalVictories += 1;
    }
    if (t1Score < t2Score) {
      teamSelected.totalLosses += 1;
    }
  };

  private setTeamHome = (completedMatches: Match[]): void => {
    completedMatches.forEach((match) => {
      this._leaderboard.forEach((team) => {
        const teamSelected = team;
        if (match.homeTeam === team.id) {
          this.setTeamPoints(teamSelected, match.homeTeamGoals, match.awayTeamGoals);
          teamSelected.totalGames += 1;
          teamSelected.goalsFavor += match.homeTeamGoals;
          teamSelected.goalsOwn += match.awayTeamGoals;
        }
      });
    });
  };

  private setTeamAway = (completedMatches: Match[]): void => {
    completedMatches.forEach((match) => {
      this._leaderboard.forEach((team) => {
        const teamSelected = team;
        if (match.awayTeam === team.id) {
          this.setTeamPoints(teamSelected, match.awayTeamGoals, match.homeTeamGoals);
          teamSelected.totalGames += 1;
          teamSelected.goalsFavor += match.awayTeamGoals;
          teamSelected.goalsOwn += match.homeTeamGoals;
        }
      });
    });
  };

  private setTeamGoalsBalance = (): void => {
    this._leaderboard.forEach((team) => {
      const goalsBalance = team.goalsFavor - team.goalsOwn;
      const teamSelected = team;
      teamSelected.goalsBalance = goalsBalance;
    });
  };

  private setTeamEfficiency = (): void => {
    this._leaderboard.forEach((team) => {
      const efficiency = +(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
      const teamSelected = team;
      teamSelected.efficiency = efficiency;
    });
  };

  private sortLeaderboard = (): void => {
    this._leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsFavor - a.goalsBalance);
  };

  private removeId = (): void => {
    this._leaderboardWithoutId = this._leaderboard.map((team) => {
      const { id, ...teamWithoutId } = team;
      return teamWithoutId;
    });
  };

  public getGameTeams = async (type: 'home' | 'away') => {
    const completedMatches = await this.matchServices.getAllMatches('false');
    const allTeams = await this.teamServices.getAll();

    this.setTeams(allTeams);

    if (type === 'home') {
      this.setTeamHome(completedMatches);
    } else this.setTeamAway(completedMatches);

    this.setTeamGoalsBalance();
    this.setTeamEfficiency();
    this.sortLeaderboard();
    this.removeId();

    return this._leaderboardWithoutId;
  };

  public getLeaderboard = async () => {
    const completedMatches = await this.matchServices.getAllMatches('false');
    const allTeams = await this.teamServices.getAll();

    this.setTeams(allTeams);
    this.setTeamHome(completedMatches);
    this.setTeamAway(completedMatches);
    this.setTeamGoalsBalance();
    this.setTeamEfficiency();
    this.sortLeaderboard();
    this.removeId();

    return this._leaderboardWithoutId;
  };
}
