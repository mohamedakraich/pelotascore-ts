import type { NextApiRequest, NextApiResponse } from 'next';
import { MatchEntity } from '../../entities/all.entity';

import { getOrCreateConnection } from '../../utils';

interface matchesType {
  [key: string]: Match[];
}

const matchEntityToMatch = (matchEntity: MatchEntity) => {
  const matchDTO: Match = {
    ...matchEntity,
    date: matchEntity.date.toDateString(),
  };
  return matchDTO;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const connection = await getOrCreateConnection();

    const matches = await connection
      .getRepository<MatchEntity>('MatchEntity')
      .createQueryBuilder('match')
      .where('match.leagueId = :lid', { lid: 'germany_1' })
      //.where('extract(month from match.date) = :m', { m: 11 })
      //.andWhere('extract(day from match.date) = :d', { d: 6 })
      .orderBy('match.date', 'ASC')
      //.take(100)
      //.groupBy('match.date')
      .getMany();

    const matchesResponse: matchesType = {};
    matches.forEach((match) => {
      if (!matchesResponse[match.date.toDateString()]) {
        matchesResponse[match.date.toDateString()] = [
          matchEntityToMatch(match),
        ];
      } else {
        matchesResponse[match.date.toDateString()].push(
          matchEntityToMatch(match)
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
