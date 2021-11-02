import type { NextApiRequest, NextApiResponse } from 'next';
import { MatchEntity } from '../../entities/all.entity';

import { getOrCreateConnection } from '../../utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const connection = await getOrCreateConnection();

    const matches = await connection
      .getRepository<MatchEntity>('MatchEntity')
      .createQueryBuilder('match')
      .where('match.leagueId = :lid', { lid: 'germany_1' })
      //.where('extract(month from match.date) = :m', { m: 11 })
      //.andWhere('extract(day from match.date) = :d', { d: 6 })
      //.orderBy('fixture.time', 'ASC')
      //.take(100)
      .getMany();

    res.status(200).json({ count: matches.length, matches });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
