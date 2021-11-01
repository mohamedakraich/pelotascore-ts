import type { NextApiRequest, NextApiResponse } from 'next';
import { FixtureEntity } from '../../entities/fixture.entity';
import { getOrCreateConnection } from '../../utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const connection = await getOrCreateConnection();

    const fixtures = await connection
      .getRepository<FixtureEntity>('FixtureEntity')
      .createQueryBuilder('fixture')
      .orderBy('fixture.time', 'ASC')
      .take(100)
      .getMany();

    res.status(200).json({ count: fixtures.length, fixtures });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
