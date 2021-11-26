import { StandingsType } from "../types/StandingsType";

const compare_standings = (a: StandingsType, b: StandingsType) => {
  if (b.Pts > a.Pts) return 1;
  else if (b.Pts < a.Pts) return -1;
  else {
    if (b.GD > a.GD) return 1;
    else if (b.GD < a.GD) return -1;
    else return 0;
  }
};

export default compare_standings;
