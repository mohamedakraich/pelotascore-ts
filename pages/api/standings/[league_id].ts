import type { NextApiRequest, NextApiResponse } from 'next';
import { StatisticsEntity } from '../../../entities/all.entity';
import { StandingsDTOType } from '../../../types/StandingsType';
import { getOrCreateConnection } from '../../../utils';
import compare_standings from '../../../utils/compare_standings';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { league_id } = req.query;
    const connection = await getOrCreateConnection();

    const standings = await connection
      .getRepository<StatisticsEntity>('StatisticsEntity')
      .createQueryBuilder('stats')
      .where('stats.leagueId = :league_id', { league_id })
      .getMany();

    const standingsDto: StandingsDTOType = {
      normal: { overall: [], home: [], away: [] },
    };

    for (let i = 0; i < standings.length; i++) {
      const {
        id,
        leagueId,
        team_name,
        overall_GP,
        overall_W,
        overall_D,
        overall_L,
        overall_GF,
        overall_GA,
        overall_GD,
        overall_Pts,
        home_GP,
        home_W,
        home_D,
        home_L,
        home_GF,
        home_GA,
        home_GD,
        home_Pts,
        away_GP,
        away_W,
        away_D,
        away_L,
        away_GF,
        away_GA,
        away_GD,
        away_Pts,
      } = standings[i];
      standingsDto.normal.overall.push({
        id,
        leagueId,
        team_name,
        GP: overall_GP,
        W: overall_W,
        D: overall_D,
        L: overall_L,
        GF: overall_GF,
        GA: overall_GA,
        GD: overall_GD,
        Pts: overall_Pts,
      });
      standingsDto.normal.overall.sort(compare_standings);
      standingsDto.normal.home.push({
        id,
        leagueId,
        team_name,
        GP: home_GP,
        W: home_W,
        D: home_D,
        L: home_L,
        GF: home_GF,
        GA: home_GA,
        GD: home_GD,
        Pts: home_Pts,
      });
      standingsDto.normal.home.sort(compare_standings);
      standingsDto.normal.away.push({
        id,
        leagueId,
        team_name,
        GP: away_GP,
        W: away_W,
        D: away_D,
        L: away_L,
        GF: away_GF,
        GA: away_GA,
        GD: away_GD,
        Pts: away_Pts,
      });
      standingsDto.normal.away.sort(compare_standings);
    }

    res.status(200).json({ standings: standingsDto });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
