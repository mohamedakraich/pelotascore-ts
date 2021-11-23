import { StatsType } from "../types/StatsType";
import { initialStats } from "../utils/constants";

/*
By default, it generates stats for Home Team.
Have to switch Home/Away values for Away Team
*/

const generate_match_stats = (
  home_FTG: number,
  away_FTG: number,
  home_1HG: number,
  away_1HG: number,
  home_2HG: number,
  away_2HG: number
): StatsType => {
  let stats = {
    ...initialStats,
    _1HT: { ...initialStats._1HT },
    _2HT: { ...initialStats._2HT },
  };

  // Checking for GP, W, D, L, GF, GA, GD, Pts
  stats.GP += 1;
  stats.GF += home_FTG;
  stats.GA += away_FTG;
  stats.GD += home_FTG - away_FTG;
  if (home_FTG > away_FTG) {
    stats.Pts += 3;
    stats.W += 1;
  } else if (home_FTG < away_FTG) {
    stats.L += 1;
  } else {
    stats.Pts += 1;
    stats.D += 1;
  }

  // Checking for FTS, BTS, CS, S2G, C2G, S3G, C3G
  if (home_FTG === 0) {
    stats.FTS += 1;
  }
  if (away_FTG === 0) {
    stats.CS += 1;
  }
  if (home_FTG * away_FTG > 0) {
    stats.BTS += 1;
  }
  if (home_FTG >= 2) {
    stats.S2G += 1;
  }
  if (away_FTG >= 2) {
    stats.C2G += 1;
  }
  if (home_FTG >= 3) {
    stats.S3G += 1;
  }
  if (away_FTG >= 3) {
    stats.C3G += 1;
  }

  // Checking for P15, P25, P35, P45
  if (home_FTG + away_FTG >= 2) {
    stats.P15 += 1;
  }
  if (home_FTG + away_FTG >= 3) {
    stats.P25 += 1;
  }
  if (home_FTG + away_FTG >= 4) {
    stats.P35 += 1;
  }
  if (home_FTG + away_FTG >= 5) {
    stats.P45 += 1;
  }

  // Checking for W_W, W_D, W_L, D_W, D_D, D_L, L_W, L_D, L_L
  if (home_1HG > away_1HG) {
    if (home_FTG > away_FTG) {
      stats.WW += 1;
    } else if (home_FTG < away_FTG) {
      stats.WL += 1;
    } else {
      stats.WD += 1;
    }
  } else if (home_1HG < away_1HG) {
    if (home_FTG > away_FTG) {
      stats.LW += 1;
    } else if (home_FTG < away_FTG) {
      stats.LL += 1;
    } else {
      stats.LD += 1;
    }
  } else {
    if (home_FTG > away_FTG) {
      stats.DW += 1;
    } else if (home_FTG < away_FTG) {
      stats.DL += 1;
    } else {
      stats.DD += 1;
    }
  }

  // Checking for _1H :   W, D, L, FTS, CS, BTS, S1G, S2G, C1G, C2G, P15, P25,
  if (home_1HG > away_1HG) {
    stats._1HT.W += 1;
  } else if (home_1HG < away_1HG) {
    stats._1HT.L += 1;
  } else {
    stats._1HT.D = +1;
  }
  if (home_1HG === 0) {
    stats._1HT.FTS += 1;
  }
  if (away_1HG === 0) {
    stats._1HT.CS += 1;
  }
  if (home_1HG * away_1HG > 0) {
    stats._1HT.BTS += 1;
  }
  if (home_1HG >= 1) {
    stats._1HT.S1G += 1;
  }
  if (away_1HG >= 1) {
    stats._1HT.C1G += 1;
  }
  if (home_1HG >= 2) {
    stats._1HT.S2G += 1;
  }
  if (away_1HG >= 2) {
    stats._1HT.C2G += 1;
  }
  if (home_1HG + away_1HG >= 2) {
    stats._1HT.P15 += 1;
  }
  if (home_1HG + away_1HG >= 3) {
    stats._1HT.P25 += 1;
  }

  // Checking for _2H :   W, D, L, FTS, CS, BTS, S1G, S2G, C1G, C2G, P15,P25
  if (home_2HG > away_2HG) {
    stats._2HT.W += 1;
  } else if (home_2HG < away_2HG) {
    stats._2HT.L += 1;
  } else {
    stats._2HT.D = +1;
  }
  if (home_2HG === 0) {
    stats._2HT.FTS += 1;
  }
  if (away_2HG === 0) {
    stats._2HT.CS += 1;
  }
  if (home_2HG * away_2HG > 0) {
    stats._2HT.BTS += 1;
  }
  if (home_2HG >= 1) {
    stats._2HT.S1G += 1;
  }
  if (away_2HG >= 1) {
    stats._2HT.C1G += 1;
  }
  if (home_2HG >= 2) {
    stats._2HT.S2G += 1;
  }
  if (away_2HG >= 2) {
    stats._2HT.C2G += 1;
  }
  if (home_2HG + away_2HG >= 2) {
    stats._2HT.P15 += 1;
  }
  if (home_2HG + away_2HG >= 3) {
    stats._2HT.P25 += 1;
  }

  return stats;
};

export default generate_match_stats;
