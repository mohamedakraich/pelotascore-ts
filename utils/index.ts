import { getConnection, createConnection } from 'typeorm';
import { FixtureEntity } from '../entities/fixture.entity';
import { MatchEntity } from '../entities/match.entity';

export async function getOrCreateConnection() {
  try {
    const conn = getConnection('pelotascore');
    return conn;
  } catch (e) {
    return createConnection({
      name: 'pelotascore',
      type: 'postgres',
      host: process.env.POSTGRES_HOST as string,
      port: parseInt(process.env.POSTGRES_PORT as string),
      username: process.env.POSTGRES_USER as string,
      password: process.env.POSTGRES_PASSWORD as string,
      database: process.env.POSTGRES_DB as string,
      entities: [FixtureEntity, MatchEntity],
      synchronize: true,
      logging: false,
    });
  }
}

export const createDate = (
  name: string,
  GP: string,
  W: string,
  FTS: string,
  CS: string,
  BTS: string,
  TG: string,
  GF: string,
  GA: string,
  P15: string,
  P25: string,
  P35: string,
  PPG: string
) => {
  return { name, GP, W, FTS, CS, BTS, TG, GF, GA, P15, P25, P35, PPG };
};
