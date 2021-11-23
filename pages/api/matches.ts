import type { NextApiRequest, NextApiResponse } from "next";
import { MatchEntity } from "../../entities/all.entity";
import { FixtureStatsMap } from "../../types/FixtureStatsMap";
import { getOrCreateConnection } from "../../utils";
import { matchEntityToFixtureStatsDTO } from "../../utils/dtos";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const connection = await getOrCreateConnection();

    const fixtures = await connection
      .getRepository<MatchEntity>("MatchEntity")
      .createQueryBuilder("match")
      .where("extract(month from match.date) = :m", { m: 11 })
      .andWhere("extract(day from match.date) = :d", { d: 27 })
      .andWhere("match.status = :status", { status: 0 })
      .leftJoinAndSelect("match.league", "league")
      .leftJoinAndSelect("match.home_team", "home_team")
      .leftJoinAndSelect("home_team.stats", "home_team_stats")
      .leftJoinAndSelect("match.away_team", "away_team")
      .leftJoinAndSelect("away_team.stats", "away_team_stats")
      .orderBy("match.date", "ASC")
      .getMany();

    const fixturesResponse: FixtureStatsMap = {};
    fixtures.forEach((fixture) => {
      if (!fixturesResponse[fixture.leagueId]) {
        fixturesResponse[fixture.leagueId] = [
          matchEntityToFixtureStatsDTO(fixture),
        ];
      } else {
        fixturesResponse[fixture.leagueId].push(
          matchEntityToFixtureStatsDTO(fixture)
        );
      }
    });

    res
      .status(200)
      .json({ count: fixtures.length, fixtures: fixturesResponse });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
