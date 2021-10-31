import type { NextApiRequest, NextApiResponse } from 'next';
import { FixtureModel } from '../../models/fixture.model';
import { getOrCreateConnection } from '../../utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const connection = await getOrCreateConnection();

    const fixtures = await connection
      .getRepository<FixtureModel>('FixtureModel')
      .createQueryBuilder('fixture')
      .where('fixture.home_GP >= :hgp', { hgp: 4 })
      .andWhere('fixture.away_GP >= :agp', { agp: 4 })
      .andWhere('fixture.home_PPG - fixture.away_PPG >= :ppg', { ppg: 2 })
      .orderBy('fixture.time', 'ASC')
      .getMany();

    res.status(200).json({ count: fixtures.length, fixtures });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
