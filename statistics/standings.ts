import 'reflect-metadata';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import { MatchEntity } from '../entities/match.entity';
import { getOrCreateConnection } from '../utils';

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
  'Manchester C',
  'Manchester Utd',
  'Newcastle Utd',
  'Norwich City',
  'Southampton',
  'Tottenham',
  'Watford',
  'West Ham Utd',
  'Wolverhampton',
];

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
    P15: number;
    ACEP35: number;
    P35: number;
  };
}

let standings: StandingsMap = {
  Arsenal: {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  'Aston Villa': {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  Brentford: {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  Brighton: {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  Burnley: {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  Chelsea: {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  'Crystal Palace': {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  Everton: {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  'Leeds Utd': {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  'Leicester City': {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  Liverpool: {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  'Manchester City': {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  'Manchester Utd': {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  'Newcastle Utd': {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  'Norwich City': {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  Southampton: {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  Tottenham: {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  Watford: {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  'West Ham Utd': {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
  Wolverhampton: {
    GP: 0,
    W: 0,
    D: 0,
    L: 0,
    GF: 0,
    GA: 0,
    GD: 0,
    P: 0,
    P15: 0,
    ACEP35: 0,
    P35: 0,
  },
};

getOrCreateConnection().then(async (connection) => {
  const matches = await connection
    .getRepository<MatchEntity>('MatchEntity')
    .createQueryBuilder('match')
    .where('match.status = :status', { status: 1 })
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
      standings[match.home_name].P15 += 1;
    }
    if (match.away_FullTimeGoals >= 2) {
      standings[match.away_name].P15 += 1;
    }

    // Checking for P35 option
    if (match.home_FullTimeGoals > match.away_FullTimeGoals) {
      standings[match.home_name].P35 += 1;
      standings[match.away_name].P35 += 1;
    }

    if (match.home_FullTimeGoals > match.away_FullTimeGoals) {
      if (match.home_FullTimeGoals + match.away_FullTimeGoals > 3.5) {
        standings[match.home_name].ACEP35 += 1;
      }
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
    (a, b) => b[1].P15 - a[1].P15
  );

  console.log(standingsTable);
});
