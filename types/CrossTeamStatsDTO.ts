export interface TeamStatsDTO {
  id: number;
  country: string;
  country_code: string;
  leagueId: string;
  league_name: string;
  team_name: string;
  GP: number;
  percentage: number;
}

export default interface CrossTeamStatsDTO {
  P15: TeamStatsDTO[];
  P25: TeamStatsDTO[];
  P35: TeamStatsDTO[];
  _1HT_P15: TeamStatsDTO[];
  _2HT_P15: TeamStatsDTO[];
}
