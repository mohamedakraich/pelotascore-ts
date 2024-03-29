export interface LeagueStatsDTO {
  FT: {
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
  };
  _1HT: {
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
  };
  _2HT: {
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
  };
}
