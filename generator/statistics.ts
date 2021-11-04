import 'reflect-metadata';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import {
  MatchEntity,
  StatisticsEntity,
  TeamEntity,
} from '../entities/all.entity';
import { getOrCreateConnection } from '../utils';
import { League } from '../scraper/matches';
import { leagues } from '../scraper/data/leagues';
import { exit } from 'process';

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
  FHS2G: 0,
  FHC2G: 0,
  FHP15: 0,
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
    FHS2G: number;
    FHC2G: number;
    FHP15: number;
  };
}

const generatestats = async (league: League) => {
  let statistics: statisticsMap = {};

  const connection = await getOrCreateConnection();

  const matches = await connection
    .getRepository<MatchEntity>('MatchEntity')
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

  return statistics;
};

getOrCreateConnection().then(async (connection) => {
  try {
    for (let l = 0; l < leagues.length; l++) {
      const statistics = await generatestats(leagues[l]);
      Object.keys(statistics).forEach(async (key) => {
        const statsEntity = new StatisticsEntity();
        statsEntity.leagueId = leagues[l].id;
        statsEntity.team_name = key;
        statsEntity.GP = statistics[key].GP;
        statsEntity.W = statistics[key].W;
        statsEntity.D = statistics[key].D;
        statsEntity.L = statistics[key].L;
        statsEntity.GF = statistics[key].GF;
        statsEntity.GA = statistics[key].GA;
        statsEntity.GD = statistics[key].GD;
        statsEntity.P = statistics[key].P;
        statsEntity.S2G = statistics[key].S2G;
        statsEntity.C2G = statistics[key].C2G;
        statsEntity.S3G = statistics[key].S3G;
        statsEntity.C3G = statistics[key].C3G;
        statsEntity.FHS2G = statistics[key].FHS2G;
        statsEntity.FHC2G = statistics[key].FHC2G;
        statsEntity.FHP15 = statistics[key].FHP15;
        const foundTeam = await connection
          .getRepository<TeamEntity>('TeamEntity')
          .findOne({ name: key });
        if (foundTeam) {
          const insertedStats = await connection
            .getRepository<StatisticsEntity>('StatisticsEntity')
            .save(statsEntity);
          foundTeam.stats = insertedStats;
          await connection
            .getRepository<TeamEntity>('TeamEntity')
            .save(foundTeam);
        }
      });
    }
  } catch (e) {
    console.error(e);
    exit();
  }
});
