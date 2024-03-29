import "reflect-metadata";
import path from "path";
import * as dotenv from "dotenv";
import axios from "axios";
import * as cheerio from "cheerio";
import cliProgress from "cli-progress";

import { exit } from "process";
import { Connection } from "typeorm";
import { getOrCreateConnection } from "../utils";
import { leagues } from "../data/leagues";

import { getLeagueStartingMonth, getMatch } from "./scraper.utils";
import { LeagueEntity } from "../entities/all.entity";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

export const LEAGUES_LENGTH = leagues.length;

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

export type League = {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  link: string;
};

const saveLeague = async (connection: Connection, league: League) => {
  try {
    const response = await axios.get(league.link, {
      responseType: "text",
    });
    const html = response.data as string;
    let $ = cheerio.load(html);
    let leagueStartingMonth = -1;
    let matches = $("#btable").first().find('tr.odd[height="28"]');
    const leagueEntity = new LeagueEntity();
    leagueEntity.id = league.id;
    leagueEntity.name = league.name;
    leagueEntity.country = league.country;
    leagueEntity.country_code = league.countryCode;
    const insertedLeague = await connection.manager.save(leagueEntity);
    for (let m = 0; m < matches.length; m++) {
      let match: any = matches[m];
      if (m === 0) {
        leagueStartingMonth = getLeagueStartingMonth(match);
      }
      const matchModel = await getMatch(connection, match, leagueStartingMonth);
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
  await connection.dropDatabase();
  await connection.synchronize();
  let counter = 0;
  bar.start(LEAGUES_LENGTH, 0);
  for (let l = 0; l < leagues.length; l++) {
    try {
      await saveLeague(connection, leagues[l]);
      counter++;
      bar.update(counter);
    } catch (e) {
      console.error(l, e);
      exit();
    }
  }
  bar.stop();
  await connection.close();
});
