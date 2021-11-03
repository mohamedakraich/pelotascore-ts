import type { NextApiRequest, NextApiResponse } from 'next';
import { MatchEntity } from '../../entities/all.entity';
import { getOrCreateConnection } from '../../utils';
import { matchEntityToMatchStatsDTO } from '../../utils/dtos';

export interface matchesType {
  [key: string]: MatchStatsDTO[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const connection = await getOrCreateConnection();

    const matches = await connection
      .getRepository<MatchEntity>('MatchEntity')
      .createQueryBuilder('match')
      .where('extract(month from match.date) = :m', { m: 11 })
      .andWhere('extract(day from match.date) = :d', { d: 6 })
      .leftJoinAndSelect('match.league', 'league')
      .leftJoinAndSelect('match.home_team', 'home_team')
      .leftJoinAndSelect('home_team.stats', 'home_team_stats')
      .leftJoinAndSelect('match.away_team', 'away_team')
      .leftJoinAndSelect('away_team.stats', 'away_team_stats')
      .orderBy('match.date', 'ASC')
      .getMany();

    console.log(matches);
    const matchesResponse: matchesType = {};
    matches.forEach((match) => {
      if (!matchesResponse[match.leagueId]) {
        matchesResponse[match.leagueId] = [matchEntityToMatchStatsDTO(match)];
      } else {
        matchesResponse[match.leagueId].push(matchEntityToMatchStatsDTO(match));
      }
    });

    res.status(200).json({ count: matches.length, matches: matchesResponse });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
