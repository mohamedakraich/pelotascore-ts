import { MatchEntity } from '../entities/all.entity';

export const matchEntityToMatchDTO = (matchEntity: MatchEntity) => {
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
      GP: home_stats.GP,
      W: home_stats.W,
      S2G: home_stats.S2G,
      C2G: home_stats.C2G,
      S3G: home_stats.S3G,
      C3G: home_stats.C3G,
      FHS1G: home_stats.FHS1G,
      FHC1G: home_stats.FHC1G,
      FHS2G: home_stats.FHS2G,
      FHC2G: home_stats.FHC2G,
      FHP15: home_stats.FHP15,
      P25: home_stats.P25,
      P35: home_stats.P35,
      P45: home_stats.P45,
    },
    home_FullTimeGoals,
    home_FirstHalfGoals,
    home_SecondHalfGoals,
    away_name,
    away_stats: {
      GP: away_stats.GP,
      W: away_stats.W,
      S2G: away_stats.S2G,
      C2G: away_stats.C2G,
      S3G: away_stats.S3G,
      C3G: away_stats.C3G,
      FHS1G: away_stats.FHS1G,
      FHC1G: away_stats.FHC1G,
      FHS2G: away_stats.FHS2G,
      FHC2G: away_stats.FHC2G,
      FHP15: away_stats.FHP15,
      P25: away_stats.P25,
      P35: away_stats.P35,
      P45: away_stats.P45,
    },
    away_FullTimeGoals,
    away_FirstHalfGoals,
    away_SecondHalfGoals,
  };

  return matchStatsDTO;
};
