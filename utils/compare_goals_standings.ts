import { GoalsStandingsType } from '../types/GoalsStandingsType';

const compare_goals_standings = (
  a: GoalsStandingsType,
  b: GoalsStandingsType
) => {
  if (b.GF > a.GF) return 1;
  else if (b.GF < a.GF) return -1;
  return 0;
};

export default compare_goals_standings;
