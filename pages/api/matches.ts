import type { NextApiRequest, NextApiResponse } from 'next';
import { MatchEntity } from '../../entities/match.entity';
import { getOrCreateConnection } from '../../utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const connection = await getOrCreateConnection();

    const matches = await connection
      .getRepository<MatchEntity>('MatchEntity')
      .createQueryBuilder('match')
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
