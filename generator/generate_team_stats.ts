import { match } from 'assert';
import { initialStats } from '../utils/constants';
import { add_stats } from './add_stats';
import generate_match_stats from './generate_match_stats';
import { StatsType } from './types';

const generate_team_stats = (mode: MatchMode, matches: Match[]): StatsType => {
  let stats = { ...initialStats };

  let formMatchs: Match[] = [];

  if (match.length < 5) formMatchs = matches;
  else formMatchs = matches.slice(-5);

  if (mode === 'HOME') {
    matches.map((match) => {
      let matchStats = generate_match_stats(
        match.home_FullTimeGoals,
        match.away_FullTimeGoals,
        match.home_FirstHalfGoals,
        match.away_FirstHalfGoals,
        match.home_SecondHalfGoals,
        match.away_SecondHalfGoals
      );
      stats = add_stats(stats, matchStats);
    });
    formMatchs.map((match) => {
      stats.Form.GP += 1;
      stats.Form.GF += match.home_FullTimeGoals;
      stats.Form.GA += match.away_FullTimeGoals;
      stats.Form.GD += match.home_FullTimeGoals - match.away_FullTimeGoals;
      if (match.home_FullTimeGoals > match.away_FullTimeGoals) {
        stats.Form.FormString = ',1' + stats.Form.FormString;
        stats.Form.W += 1;
        stats.Form.Pts += 3;
      } else if (match.home_FullTimeGoals < match.away_FullTimeGoals) {
        stats.Form.FormString = ',-1' + stats.Form.FormString;
        stats.Form.L += 1;
      } else {
        stats.Form.FormString = ',0' + stats.Form.FormString;
        stats.Form.D += 1;
        stats.Form.Pts += 1;
      }
    });
  } else {
    matches.map((match) => {
      let matchStats = generate_match_stats(
        match.away_FullTimeGoals,
        match.home_FullTimeGoals,
        match.away_FirstHalfGoals,
        match.home_FirstHalfGoals,
        match.away_SecondHalfGoals,
        match.home_SecondHalfGoals
      );
      stats = add_stats(stats, matchStats);
    });
    formMatchs.map((match) => {
      stats.Form.GP += 1;
      stats.Form.GF += match.away_FullTimeGoals;
      stats.Form.GA += match.home_FullTimeGoals;
      stats.Form.GD += match.away_FullTimeGoals - match.home_FullTimeGoals;
      if (match.away_FullTimeGoals > match.home_FullTimeGoals) {
        stats.Form.FormString = ',1' + stats.Form.FormString;
        stats.Form.W += 1;
        stats.Form.Pts += 3;
      } else if (match.away_FullTimeGoals < match.home_FullTimeGoals) {
        stats.Form.FormString = ',-1' + stats.Form.FormString;
        stats.Form.L += 1;
      } else {
        stats.Form.FormString = ',0' + stats.Form.FormString;
        stats.Form.Pts += 1;
        stats.Form.D += 1;
      }
    });
  }

  return stats;
};

export default generate_team_stats;
