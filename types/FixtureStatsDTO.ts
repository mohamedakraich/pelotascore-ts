import {
  FT_TeamStatsType,
  HT_TeamStatsType,
  TeamStatsType,
} from "./TeamStatsType";

export interface FixtureStatsDTO {
  id: number;
  status: number;
  date: string;
  league_name: string;
  home_name: string;
  away_name: string;
  FT: {
    home: FT_TeamStatsType;
    away: FT_TeamStatsType;
  };
  _1HT: { home: HT_TeamStatsType; away: HT_TeamStatsType };
  _2HT: { home: HT_TeamStatsType; away: HT_TeamStatsType };
}

export interface FT_FixtureStatsType {
  id: number;
  status: number;
  date: string;
  league_name: string;
  home_name: string;
  away_name: string;
  home_stats: FT_TeamStatsType;
  away_stats: FT_TeamStatsType;
}

export interface HT_FixtureStatsType {
  id: number;
  status: number;
  date: string;
  league_name: string;
  home_name: string;
  away_name: string;
  home_stats: HT_TeamStatsType;
  away_stats: HT_TeamStatsType;
}

export interface FixtureStatsType {
  id: number;
  status: number;
  date: string;
  league_name: string;
  home_name: string;
  away_name: string;
  home_stats: TeamStatsType;
  away_stats: TeamStatsType;
}
