import { TeamStatsDTO } from "../types/CrossTeamStatsDTO";
import { StandingsType } from "../types/StandingsType";

const compare_team_stats = (a: TeamStatsDTO, b: TeamStatsDTO) => {
  if (b.percentage > a.percentage) return 1;
  else if (b.percentage < a.percentage) return -1;
  else {
    if (b.GP > a.GP) return 1;
    else if (b.GP < a.GP) return -1;
    else return 0;
  }
};

export default compare_team_stats;
