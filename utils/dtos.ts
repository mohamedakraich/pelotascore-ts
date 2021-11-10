import { MatchEntity } from '../entities/all.entity';
import { MatchDTO } from '../types/MatchDTO';
import { MatchStatsDTO } from '../types/MatchStatsDTO';

export const matchEntityToMatchDTO = (matchEntity: MatchEntity): MatchDTO => {
  const {
    id,
    status,
    date,
    home_team: { name: home_name },
    home_FullTimeGoals,
    home_FirstHalfGoals,
    home_SecondHalfGoals,
    away_team: { name: away_name },
    away_FullTimeGoals,
    away_FirstHalfGoals,
    away_SecondHalfGoals,
  } = matchEntity;

  const matchDTO = {
    id,
    status,
    date:
      date.toDateString() +
      '#' +
      ('0' + date.getHours()).slice(-2) +
      ':' +
      ('0' + date.getMinutes()).slice(-2),
    home_name,
    home_FullTimeGoals,
    home_FirstHalfGoals,
    home_SecondHalfGoals,
    away_name,
    away_FullTimeGoals,
    away_FirstHalfGoals,
    away_SecondHalfGoals,
  };

  return matchDTO;
};

export const matchEntityToMatchStatsDTO = (
  matchEntity: MatchEntity
): MatchStatsDTO => {
  const {
    id,
    status,
    date,
    league: { name: league_name },
    home_team: { name: home_name, stats: home_stats },
    home_FullTimeGoals,
    home_FirstHalfGoals,
    home_SecondHalfGoals,
    away_team: { name: away_name, stats: away_stats },
    away_FullTimeGoals,
    away_FirstHalfGoals,
    away_SecondHalfGoals,
  } = matchEntity;

  const matchStatsDTO = {
    id,
    status,
    date: date.toISOString(),
    league_name,
    home_name,
    home_stats: {
      GP: home_stats.overall_GP,
      W: home_stats.overall_W,
      S2G: home_stats.overall_S2G,
      C2G: home_stats.overall_C2G,
      S3G: home_stats.overall_S3G,
      C3G: home_stats.overall_C3G,
      P25: home_stats.overall_P25,
      P35: home_stats.overall_P35,
      P45: home_stats.overall_P45,
    },
    home_FullTimeGoals,
    home_FirstHalfGoals,
    home_SecondHalfGoals,
    away_name,
    away_stats: {
      GP: away_stats.overall_GP,
      W: away_stats.overall_W,
      S2G: away_stats.overall_S2G,
      C2G: away_stats.overall_C2G,
      S3G: away_stats.overall_S3G,
      C3G: away_stats.overall_C3G,
      P25: away_stats.overall_P25,
      P35: away_stats.overall_P35,
      P45: away_stats.overall_P45,
    },
    away_FullTimeGoals,
    away_FirstHalfGoals,
    away_SecondHalfGoals,
  };

  return matchStatsDTO;
};
