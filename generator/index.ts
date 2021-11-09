import 'reflect-metadata';
import path from 'path';
import * as dotenv from 'dotenv';
//import cliProgress from 'cli-progress';
import { getOrCreateConnection } from '../utils';
import { LEAGUES_LENGTH } from '../scraper';
import { leagues } from '../data/leagues';
import generate_stats from './generate_stats';
import { StatisticsEntity, TeamEntity } from '../entities/all.entity';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

//const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

getOrCreateConnection().then(async (connection) => {
  //let counter = 0;
  //bar.start(LEAGUES_LENGTH, 0);
  for (let l = 0; l < leagues.length; l++) {
    const statistics = await generate_stats(leagues[l]);
    Object.keys(statistics).forEach(async (key) => {
      const statsEntity = new StatisticsEntity();
      statsEntity.leagueId = leagues[l].id;
      statsEntity.team_name = key;
      statsEntity.overall_GP = statistics[key].overall.stats.GP;
      statsEntity.overall_W = statistics[key].overall.stats.W;
      statsEntity.overall_D = statistics[key].overall.stats.D;
      statsEntity.overall_L = statistics[key].overall.stats.L;
      statsEntity.overall_GF = statistics[key].overall.stats.GF;
      statsEntity.overall_GA = statistics[key].overall.stats.GA;
      statsEntity.overall_GD = statistics[key].overall.stats.GD;
      statsEntity.overall_Pts = statistics[key].overall.stats.Pts;
      statsEntity.overall_S2G = statistics[key].overall.stats.S2G;
      statsEntity.overall_C2G = statistics[key].overall.stats.C2G;
      statsEntity.overall_S3G = statistics[key].overall.stats.S3G;
      statsEntity.overall_C3G = statistics[key].overall.stats.C3G;
      statsEntity.overall_P15 = statistics[key].overall.stats.P15;
      statsEntity.overall_P25 = statistics[key].overall.stats.P25;
      statsEntity.overall_P35 = statistics[key].overall.stats.P35;
      statsEntity.overall_P45 = statistics[key].overall.stats.P45;

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
      }
    });
    //counter++;
    //bar.update(counter);
  }
  //bar.stop();
});
