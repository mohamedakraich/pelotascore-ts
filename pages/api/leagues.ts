import type { NextApiRequest, NextApiResponse } from "next";
import { LeagueEntity, MatchEntity } from "../../entities/all.entity";
import CrossLeaguesStatsDTO from "../../types/CrossLeaguesStatsDTO";
import { getOrCreateConnection } from "../../utils";
import { leagueEntityToLeagueStatsDTO } from "../../utils/dtos";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const connection = await getOrCreateConnection();

    const leagues = await connection
      .getRepository<LeagueEntity>("LeagueEntity")
      .createQueryBuilder("league")
      .orderBy("league.id", "DESC")
      .getMany();

    const leaguesResponse: CrossLeaguesStatsDTO = {
      FT: [],
      _1HT: [],
      _2HT: [],
    };

    leagues.forEach((league) => {
      let leagueStatsDto = leagueEntityToLeagueStatsDTO(league);
      leaguesResponse.FT.push(leagueStatsDto.FT);
      leaguesResponse._1HT.push(leagueStatsDto._1HT);
      leaguesResponse._2HT.push(leagueStatsDto._2HT);
    });

    res.status(200).json({ leagues: leaguesResponse });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
