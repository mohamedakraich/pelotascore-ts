import { TeamStatsType } from './TeamStatsType';

export interface FixtureStatsDTO {
  id: number;
  status: number;
  date: string;
  league_name: string;
  home_name: string;
  away_name: string;
  overall: {
    home: TeamStatsType;
    away: TeamStatsType;
  };
  home_away: {
    home: TeamStatsType;
    away: TeamStatsType;
  };
}
