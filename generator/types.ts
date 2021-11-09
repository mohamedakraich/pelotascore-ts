export interface HTStatType {
  W: number;
  D: number;
  L: number;
  FTS: number;
  CS: number;
  BTS: number;
  S1G: number;
  C1G: number;
  C2G: number;
  S2G: number;
  P15: number;
}

export interface FormStatType {
  GP: number;
  W: number;
  D: number;
  L: number;
  GF: number;
  GA: number;
  GD: number;
  Pts: number;
}

export interface StatsType {
  GP: number;
  W: number;
  D: number;
  L: number;
  GF: number;
  GA: number;
  GD: number;
  Pts: number;
  FTS: number;
  CS: number;
  BTS: number;
  S2G: number;
  C2G: number;
  S3G: number;
  C3G: number;
  W_W: number;
  W_D: number;
  W_L: number;
  D_W: number;
  D_D: number;
  D_L: number;
  L_W: number;
  L_D: number;
  L_L: number;
  P15: number;
  P25: number;
  P35: number;
  P45: number;
  _1HT: HTStatType;
  _2HT: HTStatType;
  Form: FormStatType;
}

export interface PreStatsType {
  matches: Match[];
  stats: StatsType;
}

export interface StatisticsMap {
  [key: string]: {
    overall: PreStatsType;
    home: PreStatsType;
    away: PreStatsType;
  };
}
