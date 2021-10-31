import type { NextApiRequest, NextApiResponse } from 'next';
import { FixtureModel } from '../../models/fixture.model';
import { getOrCreateConnection } from '../../utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const connection = await getOrCreateConnection();

    const fixtures = await connection
      .getRepository(FixtureModel)
      .createQueryBuilder('fixture')
      .where('fixture.home_GP >= :hgp', { hgp: 4 })
      .andWhere('fixture.away_GP >= :agp', { agp: 4 })
      .andWhere('fixture.home_GF >= :hgf', { hgf: 2 })
      .andWhere('fixture.home_PPG >= :hppg', { hppg: 2 })
      .andWhere('fixture.away_GA >= :aga', { aga: 2 })
      .andWhere('fixture.away_PPG < :appg', { appg: 1 })
      .orderBy('fixture.time', 'ASC')
      .getMany();

    res.status(200).json({ count: fixtures.length, fixtures });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
