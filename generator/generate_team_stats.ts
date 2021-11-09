import { initialStats } from '../utils/constants';
import { add_stats } from './add_stats';
import generate_match_stats from './generate_match_stats';
import { StatsType } from './types';

const generate_team_stats = (mode: MatchMode, matches: Match[]): StatsType => {
  let stats = { ...initialStats };
  if (mode === 'HOME') {
    matches.map((match) => {
      const matchStats = generate_match_stats(
        match.home_FullTimeGoals,
        match.away_FullTimeGoals,
        match.home_FirstHalfGoals,
        match.away_FirstHalfGoals,
        match.home_SecondHalfGoals,
        match.away_SecondHalfGoals
      );
      stats = add_stats(stats, matchStats);
    });
  } else {
    matches.map((match) => {
      const matchStats = generate_match_stats(
        match.away_FullTimeGoals,
        match.home_FullTimeGoals,
        match.away_FirstHalfGoals,
        match.home_FirstHalfGoals,
        match.away_SecondHalfGoals,
        match.home_SecondHalfGoals
      );
      stats = add_stats(stats, matchStats);
    });
  }

  return stats;
};

export default generate_team_stats;
