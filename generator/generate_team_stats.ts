import { Match } from '../types/Match';
import { StatsType } from '../types/StatsType';
import { initialStats } from '../utils/constants';
import { add_stats } from './add_stats';
import generate_form_stats from './generate_form_stats';
import generate_match_stats from './generate_match_stats';

type MatchMode = 'HOME' | 'AWAY';

const generate_team_stats = (mode: MatchMode, matches: Match[]): StatsType => {
  let stats = { ...initialStats };

  console.log('generate_team_stats', stats);

  let formMatches: Match[] = [];
  if (matches.length < 5) {
    formMatches = matches;
  } else {
    formMatches = matches.slice(-5);
  }

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
      //console.log('matchStats', matchStats);
      stats = add_stats(stats, matchStats);
    });
    let formStats = generate_form_stats('HOME', '', formMatches);
    stats.FORM = formStats;
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
    let formStats = generate_form_stats('AWAY', '', formMatches);
    stats.FORM = formStats;
  }
  return stats;
};

export default generate_team_stats;
