export interface LeagueStats {
  GP: number;
  FT: {
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
