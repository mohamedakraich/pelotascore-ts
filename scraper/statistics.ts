import 'reflect-metadata';
import path from 'path';
import * as dotenv from 'dotenv';
import axios from 'axios';
import * as cheerio from 'cheerio';

import { getFixture, get_team_away, get_team_home } from './statistics_utils';
import { getOrCreateConnection } from '../utils';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

getOrCreateConnection()
  .then(async (connection) => {
    const url =
      'https://www.soccerstats.com/matches.asp?matchday=2&daym=tomorrow';

    const response = await axios.get(url, {
      responseType: 'text',
    });
    const html = response.data as string;
    let $ = cheerio.load(html);
    let teams = $('tr[bgcolor="#eaeaea"]');

    for (let f = 0; f < teams.length; f += 2) {
      let home: any = teams[f];
      let away: any = teams[f + 1];
      if (home.children.length > 5 && away.children.length > 5) {
        const fixtureTime = new Date(
          Date.parse(
            '2021-11-01T' + home.children[1].children[0].children[0].data
          )
        );
        const homeTeam = get_team_home(home);
        const awayTeam = get_team_away(away);
        const fixture = getFixture(fixtureTime, homeTeam, awayTeam);
        await connection.manager.save(fixture);
      }
    }
  })
  .catch((error) => console.log(error));
