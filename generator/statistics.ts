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
  LP15: 0,
  VP15: 0,
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
    LP15: number;
    VP15: number;
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

    // Checking for P15 option
    if (match.home_FullTimeGoals >= 2) {
      statistics[match.home_team.name].LP15 += 1;
    }
    if (match.away_FullTimeGoals >= 2) {
      statistics[match.away_team.name].VP15 += 1;
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

  /*const statisticsTable = Object.entries(statistics).sort(
    (a, b) => b[1].LP15 + b[1].VP15 - (a[1].LP15 + a[1].VP15)
  );

  console.log(statisticsTable);*/
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
        statsEntity.LP15 = statistics[key].LP15;
        statsEntity.VP15 = statistics[key].VP15;
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
