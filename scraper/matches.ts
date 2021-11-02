import 'reflect-metadata';
import path from 'path';
import * as dotenv from 'dotenv';
import axios from 'axios';
import * as cheerio from 'cheerio';
import cliProgress from 'cli-progress';

import { exit } from 'process';
import { Connection } from 'typeorm';
import { getOrCreateConnection } from '../utils';
import { leagues } from './data/leagues';

import { getLeagueStartingMonth, getMatch } from './matches_utils';
import { LeagueEntity } from '../entities/all.entity';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const LEAGUES_LENGTH = leagues.length;

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

export type League = {
  id: string;
  name: string;
  country: string;
  link: string;
};

const logLeague = async (connection: Connection, league: League) => {
  try {
    const response = await axios.get(league.link, {
      responseType: 'text',
    });
    const html = response.data as string;
    let $ = cheerio.load(html);
    let leagueStartingMonth = -1;
    let matches = $('#btable').first().find('tr.odd[height="28"]');
    const leagueEntity = new LeagueEntity();
    leagueEntity.id = league.id;
    leagueEntity.name = league.name;
    leagueEntity.country = league.country;
    const insertedLeague = await connection.manager.save(leagueEntity);
    for (let m = 0; m < matches.length; m++) {
      let match: any = matches[m];
      if (m === 0) {
        leagueStartingMonth = getLeagueStartingMonth(match);
      }
      const matchModel = getMatch(match, leagueStartingMonth);
      if (matchModel) {
        matchModel.league = insertedLeague;
        await connection.manager.save(matchModel);
      }
    }
  } catch (e) {
    console.error(league.id, e);
    exit();
  }
};

getOrCreateConnection().then(async (connection) => {
  let counter = 0;
  bar.start(LEAGUES_LENGTH, 0);
  for (let l = 0; l < leagues.length; l++) {
    try {
      await logLeague(connection, leagues[l]);
      counter++;
      bar.update(counter);
    } catch (e) {
      console.error(l, e);
      exit();
    }
  }
  bar.stop();
});
