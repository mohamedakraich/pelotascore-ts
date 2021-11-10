import { MatchEntity } from '../entities/all.entity';
import { League } from '../scraper';
import { getOrCreateConnection } from '../utils';
import { initialStatsMap } from '../utils/constants';
import { matchEntityToMatchDTO } from '../utils/dtos';
import { add_stats } from './add_stats';
import generate_form_stats from './generate_form_stats';
import generate_team_stats from './generate_team_stats';

const generate_stats = async (league: League) => {
  let statistics: StatisticsMap = {};

  try {
    const connection = await getOrCreateConnection();
    const matches = await connection
      .getRepository<MatchEntity>(MatchEntity)
      .createQueryBuilder('match')
      .where('match.league = :league_id', { league_id: league.id })
      .andWhere('match.status = :status', { status: 1 })
      .leftJoinAndSelect('match.home_team', 'home_team')
      .leftJoinAndSelect('match.away_team', 'away_team')
      .getMany();
    matches.forEach((match) => {
      if (!statistics[match.home_team.name]) {
        statistics[match.home_team.name] = { ...initialStatsMap };
      }
      if (!statistics[match.away_team.name]) {
        statistics[match.away_team.name] = { ...initialStatsMap };
      }
      statistics[match.home_team.name].overall.matches.push(
        matchEntityToMatchDTO(match)
      );
      statistics[match.home_team.name].home.matches.push(
        matchEntityToMatchDTO(match)
      );
      statistics[match.away_team.name].overall.matches.push(
        matchEntityToMatchDTO(match)
      );
      statistics[match.away_team.name].away.matches.push(
        matchEntityToMatchDTO(match)
      );
    });

    Object.keys(statistics).map((key) => {
      const homeStats = generate_team_stats(
        'HOME',
        statistics[key].home.matches
      );
      const awayStats = generate_team_stats(
        'AWAY',
        statistics[key].away.matches
      );

      statistics[key].home.stats = homeStats;
      statistics[key].away.stats = awayStats;
      statistics[key].overall.stats = add_stats(homeStats, awayStats);

      let formMatches: Match[] = [];
      if (statistics[key].overall.matches.length < 5) {
        formMatches = statistics[key].overall.matches;
      } else {
        formMatches = statistics[key].overall.matches.slice(-5);
      }

      let formStats = generate_form_stats('OVERALL', key, formMatches);
      statistics[key].overall.stats.FORM = formStats;
    });
  } catch (e) {
    console.error('generatestats', e);
  }
  return statistics;
};

export default generate_stats;
