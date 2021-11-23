export const initialHTStats = {
  W: 0,
  D: 0,
  L: 0,
  FTS: 0,
  CS: 0,
  BTS: 0,
  S1G: 0,
  C1G: 0,
  C2G: 0,
  S2G: 0,
  P15: 0,
  P25: 0,
};

export const initialFormStats = {
  GP: 0,
  W: 0,
  D: 0,
  L: 0,
  GF: 0,
  GA: 0,
  GD: 0,
  Pts: 0,
  STR: "",
};

export const initialStats = {
  GP: 0,
  W: 0,
  D: 0,
  L: 0,
  GF: 0,
  GA: 0,
  GD: 0,
  Pts: 0,
  FTS: 0,
  CS: 0,
  BTS: 0,
  S2G: 0,
  C2G: 0,
  S3G: 0,
  C3G: 0,
  WW: 0,
  WD: 0,
  WL: 0,
  DW: 0,
  DD: 0,
  DL: 0,
  LW: 0,
  LD: 0,
  LL: 0,
  P15: 0,
  P25: 0,
  P35: 0,
  P45: 0,
  _1HT: { ...initialHTStats },
  _2HT: { ...initialHTStats },
  FORM: { ...initialFormStats },
};

export const initialStatsMap = {
  overall: {
    matches: [],
    stats: {
      ...initialStats,
      _1HT: { ...initialStats._1HT },
      _2HT: { ...initialStats._2HT },
    },
  },
  home: {
    matches: [],
    stats: {
      ...initialStats,
      _1HT: { ...initialStats._1HT },
      _2HT: { ...initialStats._2HT },
    },
  },
  away: {
    matches: [],
    stats: {
      ...initialStats,
      _1HT: { ...initialStats._1HT },
      _2HT: { ...initialStats._2HT },
    },
  },
};
