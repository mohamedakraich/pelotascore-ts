import type { NextApiRequest, NextApiResponse } from 'next';
import { MatchEntity, StatisticsEntity } from '../../entities/all.entity';

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

    const standings = await connection
      .getRepository<StatisticsEntity>('StatisticsEntity')
      .createQueryBuilder('statistics')
      .where('statistics.leagueId = :lid', { lid: 'germany_1' })
      .orderBy('statistics.P', 'DESC')
      .getMany();

    /*const matchesResponse: matchesType = {};
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
    });*/

    res.status(200).json({ count: standings.length, standings });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
