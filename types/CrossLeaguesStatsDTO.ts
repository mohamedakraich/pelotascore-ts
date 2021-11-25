export interface FTLeagueStatsDTO {
  id: string;
  name: string;
  country: string;
  country_code: string;
  GP: number;
  home_w: number;
  draws: number;
  away_w: number;
  P15: number;
  P25: number;
  P35: number;
  BTS: number;
  CS: number;
  FTS: number;
}

export interface HTLeagueStatsDTO {
  id: string;
  name: string;
  country: string;
  country_code: string;
  GP: number;
  home_w: number;
  draws: number;
  away_w: number;
  P15: number;
  P25: number;
  BTS: number;
  CS: number;
  FTS: number;
}

export default interface CrossLeaguesStatsDTO {
  FT: FTLeagueStatsDTO[];
  _1HT: HTLeagueStatsDTO[];
  _2HT: HTLeagueStatsDTO[];
}
