import type { NextApiRequest, NextApiResponse } from 'next';
import { MatchEntity } from '../../../entities/all.entity';

import { getOrCreateConnection } from '../../../utils';
import { matchEntityToMatchDTO } from '../../../utils/dtos';

interface matchesType {
  [key: string]: Match[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { league_id } = req.query;
    const connection = await getOrCreateConnection();

    const matches = await connection
      .getRepository<MatchEntity>('MatchEntity')
      .createQueryBuilder('match')
      .where('match.leagueId = :league_id', { league_id })
      .andWhere('match.status = :status', { status: 1 })
      .leftJoinAndSelect('match.home_team', 'home_team')
      .leftJoinAndSelect('match.away_team', 'away_team')
      .orderBy('match.date', 'ASC')
      .getMany();

    const matchesResponse: matchesType = {};
    matches.forEach((match) => {
      if (!matchesResponse[match.date.toDateString()]) {
        matchesResponse[match.date.toDateString()] = [
          matchEntityToMatchDTO(match),
        ];
      } else {
        matchesResponse[match.date.toDateString()].push(
          matchEntityToMatchDTO(match)
        );
      }
    });

    res.status(200).json({ count: matches.length, matches: matchesResponse });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
