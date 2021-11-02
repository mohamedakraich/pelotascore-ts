import 'reflect-metadata';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import { MatchEntity } from '../entities/match.entity';
import { getOrCreateConnection } from '../utils';
import { League } from '../scraper/matches';
import { leagues } from '../scraper/data/leagues';

const teams = [
  'Arsenal',
  'Aston Villa',
  'Brentford',
  'Brighton',
  'Burnley',
  'Chelsea',
  'Crystal Palace',
  'Everton',
  'Leeds Utd',
  'Leicester City',
  'Liverpool',
  'Manchester City',
  'Manchester Utd',
  'Newcastle Utd',
  'Norwich City',
  'Southampton',
  'Tottenham',
  'Watford',
  'West Ham Utd',
  'Wolverhampton',
];

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

interface StandingsMap {
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

let standings: StandingsMap = {
  Arsenal: { ...initialTeamStats },
  'Aston Villa': { ...initialTeamStats },
  Brentford: { ...initialTeamStats },
  Brighton: { ...initialTeamStats },
  Burnley: { ...initialTeamStats },
  Chelsea: { ...initialTeamStats },
  'Crystal Palace': { ...initialTeamStats },
  Everton: { ...initialTeamStats },
  'Leeds Utd': { ...initialTeamStats },
  'Leicester City': { ...initialTeamStats },
  Liverpool: { ...initialTeamStats },
  'Manchester City': { ...initialTeamStats },
  'Manchester Utd': { ...initialTeamStats },
  'Newcastle Utd': { ...initialTeamStats },
  'Norwich City': { ...initialTeamStats },
  Southampton: { ...initialTeamStats },
  Tottenham: { ...initialTeamStats },
  Watford: { ...initialTeamStats },
  'West Ham Utd': { ...initialTeamStats },
  Wolverhampton: { ...initialTeamStats },
};

const generatestats = async (league: League) => {
  const connection = await getOrCreateConnection();

  const matches = await connection
    .getRepository<MatchEntity>('MatchEntity')
    .createQueryBuilder('match')
    .where('match.league = :league_id', { league_id: league.id })
    .andWhere('match.status = :status', { status: 1 })
    .getMany();

  matches.forEach((match) => {
    standings[match.home_name].GP += 1;
    standings[match.home_name].GF += match.home_FullTimeGoals;
    standings[match.home_name].GA += match.away_FullTimeGoals;
    standings[match.home_name].GD +=
      match.home_FullTimeGoals - match.away_FullTimeGoals;

    standings[match.away_name].GP += 1;
    standings[match.away_name].GF += match.away_FullTimeGoals;
    standings[match.away_name].GA += match.home_FullTimeGoals;
    standings[match.away_name].GD +=
      match.away_FullTimeGoals - match.home_FullTimeGoals;

    // Checking for P15 option
    if (match.home_FullTimeGoals >= 2) {
      standings[match.home_name].LP15 += 1;
    }
    if (match.away_FullTimeGoals >= 2) {
      standings[match.away_name].VP15 += 1;
    }

    // Checking For P, W, D, L
    if (match.home_FullTimeGoals > match.away_FullTimeGoals) {
      standings[match.home_name].P += 3;
      standings[match.home_name].W += 1;
      standings[match.away_name].L += 1;
    } else if (match.home_FullTimeGoals < match.away_FullTimeGoals) {
      standings[match.away_name].P += 3;
      standings[match.away_name].W += 1;
      standings[match.home_name].L += 1;
    } else {
      standings[match.home_name].P += 1;
      standings[match.home_name].D += 1;
      standings[match.away_name].P += 1;
      standings[match.away_name].D += 1;
    }
  });

  const standingsTable = Object.entries(standings).sort(
    (a, b) => b[1].LP15 + b[1].VP15 - (a[1].LP15 + a[1].VP15)
  );

  console.log(standingsTable);
};

generatestats(leagues[0]);
