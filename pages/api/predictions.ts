import type { NextApiRequest, NextApiResponse } from "next";
import { MatchEntity } from "../../entities/all.entity";
import { FixtureStatsDTO } from "../../types/FixtureStatsDTO";
import { FixtureStatsMap } from "../../types/FixtureStatsMap";
import { PredictionsDTO } from "../../types/PreditionsDTO";
import { getOrCreateConnection } from "../../utils";
import compare_predictions from "../../utils/compare_predictions";
import {
  matchEntityToFixtureStatsDTO,
  matchEntityToPredictionsDTO,
} from "../../utils/dtos";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const connection = await getOrCreateConnection();

    /*const fixtures = await connection
      .getRepository<MatchEntity>("MatchEntity")
      .createQueryBuilder("match")
      .where("extract(month from match.date) = :m", { m: 12 })
      .andWhere("extract(day from match.date) = :d", { d: 2 })
      .andWhere("match.status = :status", { status: 0 })
      .leftJoinAndSelect("match.league", "league")
      .leftJoinAndSelect("match.home_team", "home_team")
      .leftJoinAndSelect("home_team.stats", "home_team_stats")
      .leftJoinAndSelect("match.away_team", "away_team")
      .leftJoinAndSelect("away_team.stats", "away_team_stats")
      .orderBy("match.date", "ASC")
      .getMany();*/

    const fixtures = await connection
      .getRepository<MatchEntity>("MatchEntity")
      .createQueryBuilder("match")
      .where(
        `extract(month from match.date) = :m AND extract(day from match.date) = :d
        OR (extract(month from match.date) = :m2 AND extract(day from match.date) = :d2)
        OR (extract(month from match.date) = :m3 AND extract(day from match.date) = :d3)
        `,

        { m: 11, d: 30, m2: 12, d2: 1, m3: 12, d3: 2 }
      )
      .andWhere("match.status = :status", { status: 0 })
      .leftJoinAndSelect("match.league", "league")
      .leftJoinAndSelect("match.home_team", "home_team")
      .leftJoinAndSelect("home_team.stats", "home_team_stats")
      .leftJoinAndSelect("match.away_team", "away_team")
      .leftJoinAndSelect("away_team.stats", "away_team_stats")
      .orderBy("match.date", "ASC")
      .getMany();

    const predictionsResponse: PredictionsDTO[] = [];
    fixtures.forEach((fixture) => {
      predictionsResponse.push(matchEntityToPredictionsDTO(fixture));
    });

    predictionsResponse.sort(compare_predictions);

    res
      .status(200)
      .json({ count: fixtures.length, predictions: predictionsResponse });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
