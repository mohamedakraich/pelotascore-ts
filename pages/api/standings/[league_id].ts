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
      form: { overall: [], home: [], away: [] },
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
        overall_form_GP,
        overall_form_W,
        overall_form_D,
        overall_form_L,
        overall_form_GF,
        overall_form_GA,
        overall_form_GD,
        overall_form_Pts,
        home_form_GP,
        home_form_W,
        home_form_D,
        home_form_L,
        home_form_GF,
        home_form_GA,
        home_form_GD,
        home_form_Pts,
        away_form_GP,
        away_form_W,
        away_form_D,
        away_form_L,
        away_form_GF,
        away_form_GA,
        away_form_GD,
        away_form_Pts,
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

      // Form Standings

      standingsDto.form.overall.push({
        id,
        leagueId,
        team_name,
        GP: overall_form_GP,
        W: overall_form_W,
        D: overall_form_D,
        L: overall_form_L,
        GF: overall_form_GF,
        GA: overall_form_GA,
        GD: overall_form_GD,
        Pts: overall_form_Pts,
      });
      standingsDto.form.overall.sort(compare_standings);
      standingsDto.form.home.push({
        id,
        leagueId,
        team_name,
        GP: home_form_GP,
        W: home_form_W,
        D: home_form_D,
        L: home_form_L,
        GF: home_form_GF,
        GA: home_form_GA,
        GD: home_form_GD,
        Pts: home_form_Pts,
      });
      standingsDto.form.home.sort(compare_standings);
      standingsDto.form.away.push({
        id,
        leagueId,
        team_name,
        GP: away_form_GP,
        W: away_form_W,
        D: away_form_D,
        L: away_form_L,
        GF: away_form_GF,
        GA: away_form_GA,
        GD: away_form_GD,
        Pts: away_form_Pts,
      });
      standingsDto.form.away.sort(compare_standings);
    }

    res.status(200).json({ standings: standingsDto });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
