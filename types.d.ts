declare module 'react-country-flag';

type MatchMode = 'HOME' | 'AWAY';

type FormMode = 'OVERALL' | 'HOME' | 'AWAY';

type Team = {
  name: string;
  GP: string;
  W: string;
  FTS: string;
  CS: string;
  BTS: string;
  TG: string;
  GF: string;
  GA: string;
  P15: string;
  P25: string;
  P35: string;
  PPG: string;
};

type Match = {
  id: number;
  status: number;
  date: string;
  home_name: string;
  home_FullTimeGoals: number;
  home_FirstHalfGoals: number;
  home_SecondHalfGoals: number;
  away_name: string;
  away_FullTimeGoals: number;
  away_FirstHalfGoals: number;
  away_SecondHalfGoals: number;
};

type Stats = {
  GP: number;
  W: number;
  S2G: number;
  C2G: number;
  S3G: number;
  C3G: number;
  FHS1G: number;
  FHC1G: number;
  FHS2G: number;
  FHC2G: number;
  FHP15: number;
  P25: number;
  P35: number;
  P45: number;
};

type MatchDTO = {
  id: number;
  status: number;
  date: string;
  home_name: string;
  home_FullTimeGoals: number;
  home_FirstHalfGoals: number;
  home_SecondHalfGoals: number;
  away_name: string;
  away_FullTimeGoals: number;
  away_FirstHalfGoals: number;
  away_SecondHalfGoals: number;
};

type MatchStatsDTO = {
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
};

type MatchStatsType = {
  [key: string]: MatchStatsDTO[];
};

type MatchesType = {
  [key: string]: Match[];
};

type StandingsType = {
  team_name: string;
  GP: number;
  W: number;
  D: number;
  L: number;
  GF: number;
  GA: number;
  GD: number;
  P: number;
  LP15: number;
  VP15: number;
  id: number;
  league_id: string;
};

type HTStatType = {
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
};

type FormStatsType = {
  GP: number;
  W: number;
  D: number;
  L: number;
  GF: number;
  GA: number;
  GD: number;
  Pts: number;
  STR: string;
};

type StatsType = {
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
  WW: number;
  WD: number;
  WL: number;
  DW: number;
  DD: number;
  DL: number;
  LW: number;
  LD: number;
  LL: number;
  P15: number;
  P25: number;
  P35: number;
  P45: number;
  _1HT: HTStatType;
  _2HT: HTStatType;
  FORM: FormStatsType;
};

type PreStatsType = {
  matches: Match[];
  stats: StatsType;
};

type StatisticsMap = {
  [key: string]: {
    overall: PreStatsType;
    home: PreStatsType;
    away: PreStatsType;
  };
};
