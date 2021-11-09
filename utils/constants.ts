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
};

export const intialFormStats = {
  GP: 0,
  W: 0,
  D: 0,
  L: 0,
  GF: 0,
  GA: 0,
  GD: 0,
  Pts: 0,
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
  W_W: 0,
  W_D: 0,
  W_L: 0,
  D_W: 0,
  D_D: 0,
  D_L: 0,
  L_W: 0,
  L_D: 0,
  L_L: 0,
  P15: 0,
  P25: 0,
  P35: 0,
  P45: 0,
  _1HT: { ...initialHTStats },
  _2HT: { ...initialHTStats },
  Form: { ...intialFormStats },
};

export const initialPreStats = {
  matches: [],
  stats: { ...initialStats },
};

export const initialStatsMap = {
  overall: { ...initialPreStats },
  home: { ...initialPreStats },
  away: { ...initialPreStats },
};
