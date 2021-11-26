import type { NextApiRequest, NextApiResponse } from "next";
import { StatisticsEntity } from "../../entities/all.entity";
import { getOrCreateConnection } from "../../utils";
import CrossTeamStatsDTO from "../../types/CrossTeamStatsDTO";
import { calculatePercentage } from "../../components/CrossStats/FTLeaguesStatsTable";
import compare_team_stats from "../../utils/compare_team_stats";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const connection = await getOrCreateConnection();

    const teams = await connection
      .getRepository<StatisticsEntity>("StatisticsEntity")
      .createQueryBuilder("stats")
      .where("stats.overall_GP >= :overall_GP", { overall_GP: 5 })
      .leftJoinAndSelect("stats.league", "league")
      .getMany();

    const crossTeamStatsDTO: CrossTeamStatsDTO = {
      P15: [],
      P25: [],
      P35: [],
      _1HT_P15: [],
      _2HT_P15: [],
    };

    for (let t = 0; t < teams.length; t++) {
      crossTeamStatsDTO.P15.push({
        id: teams[t].id,
        country: teams[t].league.country,
        country_code: teams[t].league.country_code,
        leagueId: teams[t].league.id,
        league_name: teams[t].league.name,
        team_name: teams[t].team_name,
        GP: teams[t].overall_GP,
        percentage: calculatePercentage(
          teams[t].overall_P15,
          teams[t].overall_GP
        ),
      });
    }

    for (let t = 0; t < teams.length; t++) {
      crossTeamStatsDTO.P25.push({
        id: teams[t].id,
        country: teams[t].league.country,
        country_code: teams[t].league.country_code,
        leagueId: teams[t].league.id,
        league_name: teams[t].league.name,
        team_name: teams[t].team_name,
        GP: teams[t].overall_GP,
        percentage: calculatePercentage(
          teams[t].overall_P25,
          teams[t].overall_GP
        ),
      });
    }

    for (let t = 0; t < teams.length; t++) {
      crossTeamStatsDTO.P35.push({
        id: teams[t].id,
        country: teams[t].league.country,
        country_code: teams[t].league.country_code,
        leagueId: teams[t].league.id,
        league_name: teams[t].league.name,
        team_name: teams[t].team_name,
        GP: teams[t].overall_GP,
        percentage: calculatePercentage(
          teams[t].overall_P35,
          teams[t].overall_GP
        ),
      });
    }

    for (let t = 0; t < teams.length; t++) {
      crossTeamStatsDTO._1HT_P15.push({
        id: teams[t].id,
        country: teams[t].league.country,
        country_code: teams[t].league.country_code,
        leagueId: teams[t].league.id,
        league_name: teams[t].league.name,
        team_name: teams[t].team_name,
        GP: teams[t].overall_GP,
        percentage: calculatePercentage(
          teams[t].overall_1HT_P15,
          teams[t].overall_GP
        ),
      });
    }

    for (let t = 0; t < teams.length; t++) {
      crossTeamStatsDTO._2HT_P15.push({
        id: teams[t].id,
        country: teams[t].league.country,
        country_code: teams[t].league.country_code,
        leagueId: teams[t].league.id,
        league_name: teams[t].league.name,
        team_name: teams[t].team_name,
        GP: teams[t].overall_GP,
        percentage: calculatePercentage(
          teams[t].overall_2HT_P15,
          teams[t].overall_GP
        ),
      });
    }

    crossTeamStatsDTO.P15.sort(compare_team_stats);
    crossTeamStatsDTO.P25.sort(compare_team_stats);
    crossTeamStatsDTO.P35.sort(compare_team_stats);
    crossTeamStatsDTO._1HT_P15.sort(compare_team_stats);
    crossTeamStatsDTO._2HT_P15.sort(compare_team_stats);

    res.status(200).json({
      teams: {
        P15: crossTeamStatsDTO.P15.slice(0, 50),
        P25: crossTeamStatsDTO.P25.slice(0, 50),
        P35: crossTeamStatsDTO.P35.slice(0, 50),
        _1HT_P15: crossTeamStatsDTO._1HT_P15.slice(0, 50),
        _2HT_P15: crossTeamStatsDTO._2HT_P15.slice(0, 50),
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
