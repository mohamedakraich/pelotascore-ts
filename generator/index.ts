import 'reflect-metadata';
import path from 'path';
import * as dotenv from 'dotenv';
import { getOrCreateConnection } from '../utils';
import { leagues } from '../data/leagues';
import generate_stats from './generate_stats';
import { StatisticsEntity, TeamEntity } from '../entities/all.entity';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

getOrCreateConnection().then(async (connection) => {
  for (let l = 0; l < leagues.length; l++) {
    const statistics = await generate_stats(leagues[l]);
    Object.keys(statistics).forEach(async (key) => {
      const statsEntity = new StatisticsEntity();

      statsEntity.leagueId = leagues[l].id;

      statsEntity.team_name = key;

      statsEntity.overall_GP = statistics[key].overall.stats.GP;
      statsEntity.home_GP = statistics[key].home.stats.GP;
      statsEntity.away_GP = statistics[key].away.stats.GP;

      statsEntity.overall_W = statistics[key].overall.stats.W;
      statsEntity.home_W = statistics[key].home.stats.W;
      statsEntity.away_W = statistics[key].away.stats.W;

      statsEntity.overall_D = statistics[key].overall.stats.D;
      statsEntity.home_D = statistics[key].home.stats.D;
      statsEntity.away_D = statistics[key].away.stats.D;

      statsEntity.overall_L = statistics[key].overall.stats.L;
      statsEntity.home_L = statistics[key].home.stats.L;
      statsEntity.away_L = statistics[key].away.stats.L;

      statsEntity.overall_GF = statistics[key].overall.stats.GF;
      statsEntity.home_GF = statistics[key].home.stats.GF;
      statsEntity.away_GF = statistics[key].away.stats.GF;

      statsEntity.overall_GA = statistics[key].overall.stats.GA;
      statsEntity.home_GA = statistics[key].home.stats.GA;
      statsEntity.away_GA = statistics[key].away.stats.GA;

      statsEntity.overall_GD = statistics[key].overall.stats.GD;
      statsEntity.home_GD = statistics[key].home.stats.GD;
      statsEntity.away_GD = statistics[key].away.stats.GD;

      statsEntity.overall_Pts = statistics[key].overall.stats.Pts;
      statsEntity.home_Pts = statistics[key].home.stats.Pts;
      statsEntity.away_Pts = statistics[key].away.stats.Pts;

      statsEntity.overall_FTS = statistics[key].overall.stats.FTS;
      statsEntity.home_FTS = statistics[key].home.stats.FTS;
      statsEntity.away_FTS = statistics[key].away.stats.FTS;

      statsEntity.overall_CS = statistics[key].overall.stats.CS;
      statsEntity.home_CS = statistics[key].home.stats.CS;
      statsEntity.away_CS = statistics[key].away.stats.CS;

      statsEntity.overall_BTS = statistics[key].overall.stats.BTS;
      statsEntity.home_BTS = statistics[key].home.stats.BTS;
      statsEntity.away_BTS = statistics[key].away.stats.BTS;

      statsEntity.overall_S2G = statistics[key].overall.stats.S2G;
      statsEntity.home_S2G = statistics[key].home.stats.S2G;
      statsEntity.away_S2G = statistics[key].away.stats.S2G;

      statsEntity.overall_C2G = statistics[key].overall.stats.C2G;
      statsEntity.home_C2G = statistics[key].home.stats.C2G;
      statsEntity.away_C2G = statistics[key].away.stats.C2G;

      statsEntity.overall_S3G = statistics[key].overall.stats.S3G;
      statsEntity.home_S3G = statistics[key].home.stats.S3G;
      statsEntity.away_S3G = statistics[key].away.stats.S3G;

      statsEntity.overall_C3G = statistics[key].overall.stats.C3G;
      statsEntity.home_C3G = statistics[key].home.stats.C3G;
      statsEntity.away_C3G = statistics[key].away.stats.C3G;

      statsEntity.overall_WW = statistics[key].overall.stats.WW;
      statsEntity.home_WW = statistics[key].home.stats.WW;
      statsEntity.away_WW = statistics[key].away.stats.WW;

      statsEntity.overall_WD = statistics[key].overall.stats.WD;
      statsEntity.home_WD = statistics[key].home.stats.WD;
      statsEntity.away_WD = statistics[key].away.stats.WD;

      statsEntity.overall_WL = statistics[key].overall.stats.WL;
      statsEntity.home_WL = statistics[key].home.stats.WL;
      statsEntity.away_WL = statistics[key].away.stats.WL;

      statsEntity.overall_DW = statistics[key].overall.stats.DW;
      statsEntity.home_DW = statistics[key].home.stats.DW;
      statsEntity.away_DW = statistics[key].away.stats.DW;

      statsEntity.overall_DD = statistics[key].overall.stats.DD;
      statsEntity.home_DD = statistics[key].home.stats.DD;
      statsEntity.away_DD = statistics[key].away.stats.DD;

      statsEntity.overall_DL = statistics[key].overall.stats.DL;
      statsEntity.home_DL = statistics[key].home.stats.DL;
      statsEntity.away_DL = statistics[key].away.stats.DL;

      statsEntity.overall_LW = statistics[key].overall.stats.LW;
      statsEntity.home_LW = statistics[key].home.stats.LW;
      statsEntity.away_LW = statistics[key].away.stats.LW;

      statsEntity.overall_LD = statistics[key].overall.stats.LD;
      statsEntity.home_LD = statistics[key].home.stats.LD;
      statsEntity.away_LD = statistics[key].away.stats.LD;

      statsEntity.overall_LL = statistics[key].overall.stats.LL;
      statsEntity.home_LL = statistics[key].home.stats.LL;
      statsEntity.away_LL = statistics[key].away.stats.LL;

      statsEntity.overall_P15 = statistics[key].overall.stats.P15;
      statsEntity.home_P15 = statistics[key].home.stats.P15;
      statsEntity.away_P15 = statistics[key].away.stats.P15;

      statsEntity.overall_P25 = statistics[key].overall.stats.P25;
      statsEntity.home_P25 = statistics[key].home.stats.P25;
      statsEntity.away_P25 = statistics[key].away.stats.P25;

      statsEntity.overall_P35 = statistics[key].overall.stats.P35;
      statsEntity.home_P35 = statistics[key].home.stats.P35;
      statsEntity.away_P35 = statistics[key].away.stats.P35;

      statsEntity.overall_P45 = statistics[key].overall.stats.P45;
      statsEntity.home_P45 = statistics[key].home.stats.P45;
      statsEntity.away_P45 = statistics[key].away.stats.P45;

      statsEntity.overall_1HT_W = statistics[key].overall.stats._1HT.W;
      statsEntity.home_1HT_W = statistics[key].home.stats._1HT.W;
      statsEntity.away_1HT_W = statistics[key].away.stats._1HT.W;

      statsEntity.overall_1HT_D = statistics[key].overall.stats._1HT.D;
      statsEntity.home_1HT_D = statistics[key].home.stats._1HT.D;
      statsEntity.away_1HT_D = statistics[key].away.stats._1HT.D;

      statsEntity.overall_1HT_L = statistics[key].overall.stats._1HT.L;
      statsEntity.home_1HT_L = statistics[key].home.stats._1HT.L;
      statsEntity.away_1HT_L = statistics[key].away.stats._1HT.L;

      statsEntity.overall_1HT_FTS = statistics[key].overall.stats._1HT.FTS;
      statsEntity.home_1HT_FTS = statistics[key].home.stats._1HT.FTS;
      statsEntity.away_1HT_FTS = statistics[key].away.stats._1HT.FTS;

      statsEntity.overall_1HT_CS = statistics[key].overall.stats._1HT.CS;
      statsEntity.home_1HT_CS = statistics[key].home.stats._1HT.CS;
      statsEntity.away_1HT_CS = statistics[key].away.stats._1HT.CS;

      statsEntity.overall_1HT_BTS = statistics[key].overall.stats._1HT.BTS;
      statsEntity.home_1HT_BTS = statistics[key].home.stats._1HT.BTS;
      statsEntity.away_1HT_BTS = statistics[key].away.stats._1HT.BTS;

      statsEntity.overall_1HT_S1G = statistics[key].overall.stats._1HT.S1G;
      statsEntity.home_1HT_S1G = statistics[key].home.stats._1HT.S1G;
      statsEntity.away_1HT_S1G = statistics[key].away.stats._1HT.S1G;

      statsEntity.overall_1HT_C1G = statistics[key].overall.stats._1HT.C1G;
      statsEntity.home_1HT_C1G = statistics[key].home.stats._1HT.C1G;
      statsEntity.away_1HT_C1G = statistics[key].away.stats._1HT.C1G;

      statsEntity.overall_1HT_S2G = statistics[key].overall.stats._1HT.S2G;
      statsEntity.home_1HT_S2G = statistics[key].home.stats._1HT.S2G;
      statsEntity.away_1HT_S2G = statistics[key].away.stats._1HT.S2G;

      statsEntity.overall_1HT_C2G = statistics[key].overall.stats._1HT.C2G;
      statsEntity.home_1HT_C2G = statistics[key].home.stats._1HT.C2G;
      statsEntity.away_1HT_C2G = statistics[key].away.stats._1HT.C2G;

      statsEntity.overall_1HT_P15 = statistics[key].overall.stats._1HT.P15;
      statsEntity.home_1HT_P15 = statistics[key].home.stats._1HT.P15;
      statsEntity.away_1HT_P15 = statistics[key].away.stats._1HT.P15;

      statsEntity.overall_2HT_W = statistics[key].overall.stats._2HT.W;
      statsEntity.home_2HT_W = statistics[key].home.stats._2HT.W;
      statsEntity.away_2HT_W = statistics[key].away.stats._2HT.W;

      statsEntity.overall_2HT_D = statistics[key].overall.stats._2HT.D;
      statsEntity.home_2HT_D = statistics[key].home.stats._2HT.D;
      statsEntity.away_2HT_D = statistics[key].away.stats._2HT.D;

      statsEntity.overall_2HT_L = statistics[key].overall.stats._2HT.L;
      statsEntity.home_2HT_L = statistics[key].home.stats._2HT.L;
      statsEntity.away_2HT_L = statistics[key].away.stats._2HT.L;

      statsEntity.overall_2HT_FTS = statistics[key].overall.stats._2HT.FTS;
      statsEntity.home_2HT_FTS = statistics[key].home.stats._2HT.FTS;
      statsEntity.away_2HT_FTS = statistics[key].away.stats._2HT.FTS;

      statsEntity.overall_2HT_CS = statistics[key].overall.stats._2HT.CS;
      statsEntity.home_2HT_CS = statistics[key].home.stats._2HT.CS;
      statsEntity.away_2HT_CS = statistics[key].away.stats._2HT.CS;

      statsEntity.overall_2HT_BTS = statistics[key].overall.stats._2HT.BTS;
      statsEntity.home_2HT_BTS = statistics[key].home.stats._2HT.BTS;
      statsEntity.away_2HT_BTS = statistics[key].away.stats._2HT.BTS;

      statsEntity.overall_2HT_S1G = statistics[key].overall.stats._2HT.S1G;
      statsEntity.home_2HT_S1G = statistics[key].home.stats._2HT.S1G;
      statsEntity.away_2HT_S1G = statistics[key].away.stats._2HT.S1G;

      statsEntity.overall_2HT_C1G = statistics[key].overall.stats._2HT.C1G;
      statsEntity.home_2HT_C1G = statistics[key].home.stats._2HT.C1G;
      statsEntity.away_2HT_C1G = statistics[key].away.stats._2HT.C1G;

      statsEntity.overall_2HT_S2G = statistics[key].overall.stats._2HT.S2G;
      statsEntity.home_2HT_S2G = statistics[key].home.stats._2HT.S2G;
      statsEntity.away_2HT_S2G = statistics[key].away.stats._2HT.S2G;

      statsEntity.overall_2HT_C2G = statistics[key].overall.stats._2HT.C2G;
      statsEntity.home_2HT_C2G = statistics[key].home.stats._2HT.C2G;
      statsEntity.away_2HT_C2G = statistics[key].away.stats._2HT.C2G;

      statsEntity.overall_2HT_P15 = statistics[key].overall.stats._2HT.P15;
      statsEntity.home_2HT_P15 = statistics[key].home.stats._2HT.P15;
      statsEntity.away_2HT_P15 = statistics[key].away.stats._2HT.P15;

      statsEntity.overall_form_GP = statistics[key].overall.stats.FORM.GP;
      statsEntity.home_form_GP = statistics[key].home.stats.FORM.GP;
      statsEntity.away_form_GP = statistics[key].away.stats.FORM.GP;

      statsEntity.overall_form_W = statistics[key].overall.stats.FORM.W;
      statsEntity.home_form_W = statistics[key].home.stats.FORM.W;
      statsEntity.away_form_W = statistics[key].away.stats.FORM.W;

      statsEntity.overall_form_D = statistics[key].overall.stats.FORM.D;
      statsEntity.home_form_D = statistics[key].home.stats.FORM.D;
      statsEntity.away_form_D = statistics[key].away.stats.FORM.D;

      statsEntity.overall_form_L = statistics[key].overall.stats.FORM.L;
      statsEntity.home_form_L = statistics[key].home.stats.FORM.L;
      statsEntity.away_form_L = statistics[key].away.stats.FORM.L;

      statsEntity.overall_form_GF = statistics[key].overall.stats.FORM.GF;
      statsEntity.home_form_GF = statistics[key].home.stats.FORM.GF;
      statsEntity.away_form_GF = statistics[key].away.stats.FORM.GF;

      statsEntity.overall_form_GA = statistics[key].overall.stats.FORM.GA;
      statsEntity.home_form_GA = statistics[key].home.stats.FORM.GA;
      statsEntity.away_form_GA = statistics[key].away.stats.FORM.GA;

      statsEntity.overall_form_GD = statistics[key].overall.stats.FORM.GD;
      statsEntity.home_form_GD = statistics[key].home.stats.FORM.GD;
      statsEntity.away_form_GD = statistics[key].away.stats.FORM.GD;

      statsEntity.overall_form_Pts = statistics[key].overall.stats.FORM.Pts;
      statsEntity.home_form_Pts = statistics[key].home.stats.FORM.Pts;
      statsEntity.away_form_Pts = statistics[key].away.stats.FORM.Pts;

      statsEntity.overall_form_string = statistics[key].overall.stats.FORM.STR;
      statsEntity.home_form_string = statistics[key].home.stats.FORM.STR;
      statsEntity.away_form_string = statistics[key].away.stats.FORM.STR;

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
  }
});
