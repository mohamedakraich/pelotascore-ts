import { initialFormStats } from '../utils/constants';

/*
This function generates home team form stats for a given match.
For away team form stats you just have to switch home_FTG and away_FTG
*/
const generate_match_form_stats = (
  home_FTG: number,
  away_FTG: number
): FormStatsType => {
  let matchFormStats: FormStatsType = { ...initialFormStats };
  matchFormStats.GP += 1;
  matchFormStats.GF += home_FTG;
  matchFormStats.GA += away_FTG;
  matchFormStats.GD += home_FTG - away_FTG;
  if (home_FTG > away_FTG) {
    matchFormStats.STR = ',W' + matchFormStats.STR;
    matchFormStats.W += 1;
    matchFormStats.Pts += 3;
  } else if (home_FTG < away_FTG) {
    matchFormStats.STR = ',L' + matchFormStats.STR;
    matchFormStats.L += 1;
  } else {
    matchFormStats.STR = ',D' + matchFormStats.STR;
    matchFormStats.D += 1;
    matchFormStats.Pts += 1;
  }
  return matchFormStats;
};

const generate_form_stats = (
  mode: FormMode,
  team_name: string,
  formMatches: Match[]
): FormStatsType => {
  let formStats: FormStatsType = { ...initialFormStats };
  if (mode === 'HOME') {
    formMatches.map((match) => {
      let tmpMatchFormStats = generate_match_form_stats(
        match.home_FullTimeGoals,
        match.away_FullTimeGoals
      );
      formStats.GP += tmpMatchFormStats.GP;
      formStats.W += tmpMatchFormStats.W;
      formStats.D += tmpMatchFormStats.D;
      formStats.L += tmpMatchFormStats.L;
      formStats.GF += tmpMatchFormStats.GF;
      formStats.GA += tmpMatchFormStats.GA;
      formStats.GD += tmpMatchFormStats.GD;
      formStats.Pts += tmpMatchFormStats.Pts;
      formStats.STR += tmpMatchFormStats.STR;
    });
  } else if (mode === 'AWAY') {
    formMatches.map((match) => {
      let tmpMatchFormStats = generate_match_form_stats(
        match.away_FullTimeGoals,
        match.home_FullTimeGoals
      );
      formStats.GP += tmpMatchFormStats.GP;
      formStats.W += tmpMatchFormStats.W;
      formStats.D += tmpMatchFormStats.D;
      formStats.L += tmpMatchFormStats.L;
      formStats.GF += tmpMatchFormStats.GF;
      formStats.GA += tmpMatchFormStats.GA;
      formStats.GD += tmpMatchFormStats.GD;
      formStats.Pts += tmpMatchFormStats.Pts;
      formStats.STR += tmpMatchFormStats.STR;
    });
  } else {
    formMatches.map((match) => {
      let tmpMatchFormStats: FormStatsType;
      if (match.home_name === team_name) {
        tmpMatchFormStats = generate_match_form_stats(
          match.home_FullTimeGoals,
          match.away_FullTimeGoals
        );
      } else {
        tmpMatchFormStats = generate_match_form_stats(
          match.away_FullTimeGoals,
          match.home_FullTimeGoals
        );
      }
      formStats.GP += tmpMatchFormStats.GP;
      formStats.W += tmpMatchFormStats.W;
      formStats.D += tmpMatchFormStats.D;
      formStats.L += tmpMatchFormStats.L;
      formStats.GF += tmpMatchFormStats.GF;
      formStats.GA += tmpMatchFormStats.GA;
      formStats.GD += tmpMatchFormStats.GD;
      formStats.Pts += tmpMatchFormStats.Pts;
      formStats.STR += tmpMatchFormStats.STR;
    });
  }

  return formStats;
};

export default generate_form_stats;
