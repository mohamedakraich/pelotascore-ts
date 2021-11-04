import 'reflect-metadata';
import path from 'path';
import * as dotenv from 'dotenv';
//import cliProgress from 'cli-progress';
import { getOrCreateConnection } from '../utils';
import { LEAGUES_LENGTH } from '../scraper';
import { leagues } from '../data/leagues';
import { generatestats } from './generate.utils';
import { StatisticsEntity, TeamEntity } from '../entities/all.entity';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

//const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

getOrCreateConnection().then(async (connection) => {
  //let counter = 0;
  //bar.start(LEAGUES_LENGTH, 0);
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
      statsEntity.FHS1G = statistics[key].FHS1G;
      statsEntity.FHC1G = statistics[key].FHC1G;
      statsEntity.FHS2G = statistics[key].FHS2G;
      statsEntity.FHC2G = statistics[key].FHC2G;
      statsEntity.FHP15 = statistics[key].FHP15;
      statsEntity.P25 = statistics[key].P25;
      statsEntity.P35 = statistics[key].P35;
      statsEntity.P45 = statistics[key].P45;

      try {
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
      } catch (e) {
        console.error('foundTeam', e);
        //await connection.close();
      }
    });
    //counter++;
    //bar.update(counter);
  }
  //bar.stop();
});
