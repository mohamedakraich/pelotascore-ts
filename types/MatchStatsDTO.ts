import { Stats } from './Stats';

export interface MatchStatsDTO {
  id: number;
  status: number;
  date: string;
  league_name: string;
  home_name: string;
  home_stats: Stats;
  home_FullTimeGoals: number;
  home_FirstHalfGoals: number;
  home_SecondHalfGoals: number;
  away_name: string;
  away_stats: Stats;
  away_FullTimeGoals: number;
  away_FirstHalfGoals: number;
  away_SecondHalfGoals: number;
}
