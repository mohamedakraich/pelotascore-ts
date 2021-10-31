import type { NextApiRequest, NextApiResponse } from 'next';
import { FixtureModel } from '../../models/fixture.model';
import { getOrCreateConnection } from '../../utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const connection = await getOrCreateConnection();
    const fixtures = await connection
      .getRepository<FixtureModel>('FixtureModel')
      .createQueryBuilder('fixture')
      .where('fixture.home_GF +  fixture.away_GF >= :atg', { atg: 7 })
      //.orWhere('fixture.home_GA + fixture.away_GF > :btg', { btg: 5 })
      .orderBy('fixture.time', 'ASC')
      .getMany();

    res.status(200).json({ count: fixtures.length, fixtures });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
