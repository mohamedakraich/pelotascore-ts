import type { NextApiRequest, NextApiResponse } from 'next';
import { StatisticsEntity } from '../../../entities/all.entity';
import { getOrCreateConnection } from '../../../utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { league_id } = req.query;
    const connection = await getOrCreateConnection();

    const standings = await connection
      .getRepository<StatisticsEntity>('StatisticsEntity')
      .createQueryBuilder('statistics')
      .where('statistics.leagueId = :league_id', { league_id })
      .orderBy('statistics.P', 'DESC')
      .getMany();
    res.status(200).json({ count: standings.length, standings });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
