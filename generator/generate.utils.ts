import { MatchEntity } from '../entities/all.entity';
import { League } from '../scraper';
import { getOrCreateConnection } from '../utils';

const initialTeamStats = {
  GP: 0,
  W: 0,
  D: 0,
  L: 0,
  GF: 0,
  GA: 0,
  GD: 0,
  P: 0,
  S2G: 0,
  C2G: 0,
  S3G: 0,
  C3G: 0,
  FHS1G: 0,
  FHC1G: 0,
  FHS2G: 0,
  FHC2G: 0,
  FHP15: 0,
  P25: 0,
  P35: 0,
  P45: 0,
};

interface statisticsMap {
  [key: string]: {
    GP: number;
    W: number;
    D: number;
    L: number;
    GF: number;
    GA: number;
    GD: number;
    P: number;
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
}

export const generatestats = async (league: League) => {
  let statistics: statisticsMap = {};

  try {
    const connection = await getOrCreateConnection();
    const matches = await connection
      .getRepository<MatchEntity>(MatchEntity)
      .createQueryBuilder('match')
      .where('match.league = :league_id', { league_id: league.id })
      .andWhere('match.status = :status', { status: 1 })
      .leftJoinAndSelect('match.home_team', 'home_team')
      .leftJoinAndSelect('match.away_team', 'away_team')
      .getMany();
    matches.forEach((match) => {
      if (!statistics[match.home_team.name]) {
        statistics[match.home_team.name] = { ...initialTeamStats };
      }
      if (!statistics[match.away_team.name]) {
        statistics[match.away_team.name] = { ...initialTeamStats };
      }
      statistics[match.home_team.name].GP += 1;
      statistics[match.home_team.name].GF += match.home_FullTimeGoals;
      statistics[match.home_team.name].GA += match.away_FullTimeGoals;
      statistics[match.home_team.name].GD +=
        match.home_FullTimeGoals - match.away_FullTimeGoals;

      statistics[match.away_team.name].GP += 1;
      statistics[match.away_team.name].GF += match.away_FullTimeGoals;
      statistics[match.away_team.name].GA += match.home_FullTimeGoals;
      statistics[match.away_team.name].GD +=
        match.away_FullTimeGoals - match.home_FullTimeGoals;

      //Checking for P25
      if (match.home_FullTimeGoals + match.away_FullTimeGoals >= 3) {
        statistics[match.home_team.name].P25 += 1;
        statistics[match.away_team.name].P25 += 1;
      }

      //Checking for P35
      if (match.home_FullTimeGoals + match.away_FullTimeGoals >= 4) {
        statistics[match.home_team.name].P35 += 1;
        statistics[match.away_team.name].P35 += 1;
      }

      //Checking for P45
      if (match.home_FullTimeGoals + match.away_FullTimeGoals >= 5) {
        statistics[match.home_team.name].P45 += 1;
        statistics[match.away_team.name].P45 += 1;
      }

      //Checking for FHP15
      if (match.home_FirstHalfGoals + match.away_FirstHalfGoals >= 2) {
        statistics[match.home_team.name].FHP15 += 1;
        statistics[match.away_team.name].FHP15 += 1;
      }

      //Checking for S2G and C2G
      if (match.home_FullTimeGoals >= 2) {
        statistics[match.home_team.name].S2G += 1;
        statistics[match.away_team.name].C2G += 1;
      }
      if (match.away_FullTimeGoals >= 2) {
        statistics[match.away_team.name].S2G += 1;
        statistics[match.home_team.name].C2G += 1;
      }

      //Checking for S3G and C3G
      if (match.home_FullTimeGoals >= 3) {
        statistics[match.home_team.name].S3G += 1;
        statistics[match.away_team.name].C3G += 1;
      }
      if (match.away_FullTimeGoals >= 3) {
        statistics[match.away_team.name].S3G += 1;
        statistics[match.home_team.name].C3G += 1;
      }

      //Checking for FHS1G and FHC1G
      if (match.home_FirstHalfGoals >= 1) {
        statistics[match.home_team.name].FHS1G += 1;
        statistics[match.away_team.name].FHC1G += 1;
      }
      if (match.away_FirstHalfGoals >= 1) {
        statistics[match.away_team.name].FHS1G += 1;
        statistics[match.home_team.name].FHC1G += 1;
      }

      //Checking for FHS2G and FHC2G
      if (match.home_FirstHalfGoals >= 2) {
        statistics[match.home_team.name].FHS2G += 1;
        statistics[match.away_team.name].FHC2G += 1;
      }
      if (match.away_FirstHalfGoals >= 3) {
        statistics[match.away_team.name].FHS2G += 1;
        statistics[match.home_team.name].FHC2G += 1;
      }

      // Checking For P, W, D, L
      if (match.home_FullTimeGoals > match.away_FullTimeGoals) {
        statistics[match.home_team.name].P += 3;
        statistics[match.home_team.name].W += 1;
        statistics[match.away_team.name].L += 1;
      } else if (match.home_FullTimeGoals < match.away_FullTimeGoals) {
        statistics[match.away_team.name].P += 3;
        statistics[match.away_team.name].W += 1;
        statistics[match.home_team.name].L += 1;
      } else {
        statistics[match.home_team.name].P += 1;
        statistics[match.home_team.name].D += 1;
        statistics[match.away_team.name].P += 1;
        statistics[match.away_team.name].D += 1;
      }
    });
  } catch (e) {
    //await connection.close();
    console.error('generatestats', e);
  }
  return statistics;
};
